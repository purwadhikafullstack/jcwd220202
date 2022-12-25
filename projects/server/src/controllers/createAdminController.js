const db = require("../../models")
const bcrypt = require("bcrypt")
const axios = require("axios")

const createAdminController = {
    createAdmin: async (req, res) => {
        try {
            const { email, password, cityName, branch_name } = req.body

            const hashedPassword = bcrypt.hashSync(password, 5)

            const defaultUsername = (email) => {
                const splitEmail = email.split("@")

                return splitEmail[0]
            }

            const newAdmin = await db.User.create({
                email: email,
                password: hashedPassword,
                username: defaultUsername(email),
                RoleId: 2,
            })

            const location = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?key=35f5a57bf6e34a37b2e73c0d586eb358&q=${cityName}`
            )

            const latitude = location.data.results[0].geometry.lat
            const longitude = location.data.results[0].geometry.lng

            const address = await db.Address.create({
                UserId: newAdmin.id,
                address_name: cityName,
                lat: latitude,
                lng: longitude,
            })

            const newBranch = await db.Branch.create({
                UserId: newAdmin.id,
                branch_name: branch_name,
            })

            const findAllProducts = await db.Product.findAll()

            const parseFindAllProducts = JSON.parse(
                JSON.stringify(findAllProducts)
            )

            const createProductBranch = parseFindAllProducts.map((val) => {
                return {
                    ProductId: val.id,
                    BranchId: newBranch.id,
                }
            })

            const productBranchRes = await db.ProductBranch.bulkCreate(
                createProductBranch
            )

            return res.status(200).json({
                dataAdmin: newAdmin,
                dataBranch: newBranch,
                dataProductBranch: productBranchRes,
                dataAddress: address,
                message: "admin, branch, and product created",
            })
        } catch (error) {
            return res.status(500).json({
                message: "server error",
            })
        }
    },
    // testAddress: async (req, res) => {
    //     try {
    //         const { cityName } = req.body

    //         const location = await axios.get(
    //             `https://api.opencagedata.com/geocode/v1/json?key=35f5a57bf6e34a37b2e73c0d586eb358&q=${cityName}`
    //         )

    //         const latitude = location.data.results[0].geometry.lat
    //         const longitude = location.data.results[0].geometry.lng

    //         const address = await db.Address.create({
    //             // UserId: req.user.id,
    //             address_name: cityName,
    //             lat: latitude,
    //             lng: longitude,
    //         })
    //         return res.status(200).json({
    //             dataAddress: address,
    //             message: "address created",
    //         })
    //     } catch (error) {
    //         return res.status(500).json({
    //             message: "server error",
    //         })
    //     }
    // },
    // getTest: async (req, res) => {
    //     try {
    //         const { cityName } = req.body

    //         const location = await axios.get(
    //             `https://api.opencagedata.com/geocode/v1/json?key=35f5a57bf6e34a37b2e73c0d586eb358&q=${cityName}`
    //         )

    //         const latitude = location.data.results[0].geometry.lat
    //         const longitude = location.data.results[0].geometry.lng

    //         return res.status(200).json({
    //             address_name: cityName,
    //             lat: latitude,
    //             lng: longitude,
    //         })
    //     } catch (error) {
    //         console.log(error)
    //         return res.status(500).json({
    //             message: "server error",
    //         })
    //     }
    // },
}

module.exports = createAdminController
