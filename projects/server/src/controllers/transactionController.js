const { Op } = require("sequelize")
const db = require("../../models")

const transactionController = {
    // addToCart: async (req, res) => {
    //     try {
    //         const conditionDouble = await db.Carts.findOne({
    //             where: {
    //                 ProductBranchId,
    //             },
    //         })
    //         if (conditionDouble) {
    //             return res.status(400).json({
    //                 message: "Product already added",
    //             })
    //         }

    //         const addProduct = await Carts.create({
    //             ProductBranchId: id,
    //             UserId: req.user.id,
    //         })
    //         return res.status(200).json({
    //             message: "Added to cart",
    //             data: addProduct,
    //         })
    //     } catch (err) {
    //         console.log(err)
    //         return res.status(500).json({
    //             message: "server error",
    //         })
    //     }
    // },
    createPayment: async (req, res) => {
        try {
            await db.Transaction.create({ ...req.body })

            return res.status(200).json({
                message: "create transaction",
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: "Server error",
            })
        }
    },
    updatePayment: async (req, res) => {
        try {
            await db.Transaction.findOne({
                where: {
                    id: req.params.id,
                },
            })

            await db.Transaction.update(
                {
                    payment_proof_img: req.file.filename,
                },
                {
                    where: {
                        id: req.params.id,
                    },
                }
            )

            return res.status(200).json({
                message: "Payment uploaded",
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: "Server error upload payment",
            })
        }
    },
}

module.exports = transactionController
