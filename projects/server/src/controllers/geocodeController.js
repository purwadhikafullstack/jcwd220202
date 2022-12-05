const opencage = require("opencage-api-client")
const db = require("../../models")
const { signToken } = require("../../lib/jwt")
const { Op } = require("sequelize")

const userController = {
  distanceStoreToUser: async (req, res) => {
    try {
      let geoList = []

      const results = await db.ProductBranch.findAll({
        where: [
          { BranchId: 2 }, 
        ],
        attributes: ["ProductId"]
      })
      geoList = results

      return res.status(201).json({
        message: "Nearest store located",
        data: results,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  userLocation: async (req, res) => {
    const { id, cityName } = req.body

    opencage
      .geocode({
        q: cityName,
        key: "0fd98316b56145ae9817db3d16da91ea",
      })
      .then(async (data) => {
        if (data.results.length > 0) {
          const place = data.results[0]
          console.log(place.geometry.lat)
          //   await db.Branch.update({
          //     distance: place.geometry.lat,
          //   }, {
          //     where: {
          //         id: id
          //     }
          //   })

          return res.status(200).json({
            coordinate_point: place.geometry,
            city: place.components.city,
          })
        } else {
          console.log("Status", data.status.message)
          console.log("total_results", data.total_results)
          return res.status(400).json({
            status: data.status.message,
            result: data.total_results,
          })
        }
      })
      .catch((error) => {
        console.log("Error", error.message)
        return res.status(500).json({
          message: "Server error",
        })
      })

    // try {
    //   const { cityName } = req.body

    //   const apiResult = await geocode({
    //       q: "London",
    //       key: "deb63d3699474864a43143c467b64441",
    //   })
    //   console.log(apiResult.result);
    //   if (apiResult?.result.length > 0) {
    //     const geocoded = apiResult.results[0]
    //     // latitude = geocoded.geometry.lat
    //     // longitude = geocoded.geometry.lng
    //     return res.status(200).json({
    //       message: "Sending location",
    //       result: geocoded.geometry,
    //     })
    //   } else {
    //     return "salahhh"
    //   }
    // } catch (err) {
    //   return res.status(500).json({
    //     message: "Server errrrrror",
    //   })
    // }
  },
  userAddressSelect: async (req, res) => {
    try {
      return res.status(201).json({
        message: "Admin login",
        data: findUserByEmail,
        token,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "Server Error Login User",
      })
    }
  },
}

module.exports = userController
