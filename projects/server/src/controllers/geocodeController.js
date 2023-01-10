const opencage = require("opencage-api-client");
const db = require("../../models");
const { signToken } = require("../../lib/jwt");
const { Op, QueryTypes } = require("sequelize");
const { sequelize } = require("../../models");
const axios = require("axios");
const cityjson = require("../../public/citycode.json")
const fs = require('fs');

axios.defaults.baseURL = "https://api.rajaongkir.com/starter";
axios.defaults.headers.common["key"] = "694d758dd78ff55a382c3b4c55aa8593";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

const geocodeController = {
  // distanceStoreToUser: async (req, res) => {
  //   try {
  //     const userCoordinate = await db.User.findOne({
  //       where: {
  //         id: req.params.id,
  //       },
  //       include: [
  //         {
  //           model: db.Address,
  //         },
  //       ],
  //     });

  //     const lat = userCoordinate.Address.latitude;
  //     const lon = userCoordinate.Address.longitude;
  //     // console.log(lat, lon)

  //     const query = `6371 *
  //       acos(
  //         cos(radians(${lat})) *
  //           cos(radians(latitude)) *
  //           cos(radians(longitude) - radians(107.6049539)) +
  //           sin(radians(${lat})) * sin(radians(latitude))
  //       )`;

  //     //   const pickBranchh = await db.sequelize.query(
  //     //     `SELECT "username", "RoleId", "address", "latitude", "longitude",
  //     //   MIN(${query})  FROM db.User
  //     // JOIN db.Address
  //     // ON db.User.AddressId = db.Addresses.id
  //     // WHERE db.User.RoleId = 2`,
  //     //      );

  //     const pickBranch = await db.User.findOne({
  //       where: {
  //         RoleId: 2,
  //       },
  //       include: [
  //         {
  //           model: db.Address,
  //         },
  //       ],
  //       attributes: {
  //         include: sequelize.literal(query)
  //       },
  //     });

  //     // const coba = JSON.parse(JSON.stringify(pickBranch));
  //     // console.log(coba);

  //     // ------------------------------------------
  //     // const {
  //     //   product_name = "",
  //     //   product_price = "",
  //     //   CategoryId = "",
  //     //   _sortBy = "product_name",
  //     //   _sortDir = "ASC",
  //     //   _limit = 12,
  //     //   _page = 1,
  //     // } = req.query;

  //     // if (
  //     //   _sortBy === "product_name" ||
  //     //   _sortBy === "CategoryId" ||
  //     //   _sortBy === "product_price" ||
  //     //   product_name ||
  //     //   product_price ||
  //     //   CategoryId
  //     // ) {
  //     //   if (!Number(CategoryId)) {
  //     //     const findBranchById = await db.Branch.findAndCountAll({
  //     //       limit: Number(_limit),
  //     //       offset: (_page - 1) * _limit,
  //     //       subQuery: false,
  //     //       where: {
  //     //         UserId: coba.id,
  //     //       },
  //     //       attributes: {
  //     //         exclude: ["branch_address", "distance", "createdAt", "updatedAt"],
  //     //       },
  //     //       include: [
  //     //         {
  //     //           model: db.ProductBranch,
  //     //           include: [
  //     //             {
  //     //               model: db.Product,
  //     //               where: {
  //     //                 [Op.or]: [
  //     //                   {
  //     //                     product_name: {
  //     //                       [Op.like]: `%${product_name}%`,
  //     //                     },
  //     //                   },
  //     //                 ],
  //     //               },
  //     //               include: [{ model: db.Category }],
  //     //             },
  //     //           ],
  //     //         },
  //     //       ],
  //     //       order: [
  //     //         [
  //     //           { model: db.ProductBranch },
  //     //           { model: db.Product },
  //     //           _sortBy,
  //     //           _sortDir,
  //     //         ],
  //     //       ],
  //     //     });

  //     //     // const parseFindBranchById = JSON.parse(
  //     //     //   JSON.stringify(findBranchById)
  //     //     // );

  //     //     // const findBranchData = parseFindBranchById[0].ProductBranches;

  //     //     // console.log(findBranchData);

  //     //     return res.status(200).json({
  //     //       data: findBranchById.rows,
  //     //       dataCount: findBranchById.count,
  //     //       message: "get branch data",
  //     //     });
  //     //   }

  //     //   const findBranchById = await db.Branch.findAndCountAll({
  //     //     limit: Number(_limit),
  //     //     offset: (_page - 1) * _limit,
  //     //     subQuery: false,
  //     //     where: {
  //     //       UserId: coba.id,
  //     //     },
  //     //     attributes: {
  //     //       exclude: ["branch_address", "distance", "createdAt", "updatedAt"],
  //     //     },
  //     //     include: [
  //     //       {
  //     //         model: db.ProductBranch,
  //     //         include: [
  //     //           {
  //     //             model: db.Product,
  //     //             where: {
  //     //               [Op.or]: [
  //     //                 {
  //     //                   product_name: {
  //     //                     [Op.like]: `%${product_name}%`,
  //     //                   },
  //     //                 },
  //     //               ],
  //     //               CategoryId: CategoryId,
  //     //             },
  //     //             include: [{ model: db.Category }],
  //     //           },
  //     //         ],
  //     //       },
  //     //     ],
  //     //     order: [
  //     //       [
  //     //         { model: db.ProductBranch },
  //     //         { model: db.Product },
  //     //         _sortBy,
  //     //         _sortDir,
  //     //       ],
  //     //     ],
  //     //   });

  //     //   // const parseFindBranchById = JSON.parse(JSON.stringify(findBranchById));

  //     //   // const findBranchData = parseFindBranchById[0].ProductBranches;

  //     //   return res.status(200).json({
  //     //     message: "get branch data",
  //     //     data: findBranchById.rows,
  //     //     dataCount: findBranchById.count,
  //     //   });
  //     // }

  //     // const findBranchById = await db.Branch.findAndCountAlll({
  //     //   limit: Number(_limit),
  //     //   offset: (_page - 1) * _limit,
  //     //   subQuery: false,
  //     //   where: {
  //     //     UserId: coba.id,
  //     //   },
  //     //   attributes: {
  //     //     exclude: ["branch_address", "distance", "createdAt", "updatedAt"],
  //     //   },
  //     //   include: [
  //     //     {
  //     //       model: db.ProductBranch,
  //     //       include: [
  //     //         {
  //     //           model: db.Product,
  //     //           include: [{ model: db.Category }],
  //     //         },
  //     //       ],
  //     //     },
  //     //   ],
  //     // });

  //     // const parseFindBranchById = JSON.parse(JSON.stringify(findBranchById));

  //     // const findBranchData = parseFindBranchById[0].ProductBranches;

  //     return res.status(200).json({
  //       data: findBranchById.rows,
  //       dataCount: findBranchById.count,
  //       message: "get branch data",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json({
  //       message: "server error",
  //     });
  //   }
  // },
  userLocation: async (req, res) => {
    const { cityName } = req.body;

    const check = () => {
      if (place.components._type == "city") {
        return true;
      } else {
        return false;
      }
    };

    opencage
      .geocode({
        q: cityName,
        key: "0fd98316b56145ae9817db3d16da91ea",
      })
      .then(async (data) => {
        if (data.results.length > 0) {
          const place = data.results[0];
          // console.log(JSON.parse(JSON.stringify(place)));
          // console.log(place.formatted);
          // console.log(place.components._type);

          if (place.components._type === "city") {
            return res.status(200).json({
              data: place,
              latitude: place.geometry.lat,
              longitude: place.geometry.lng,
              city: place.components.city,
            });
          } else {
            return res.status(400).json({
              message: "Not a city",
            });
          }
        } else {
          console.log("Status", data.status.message);
          console.log("total_results", data.total_results);
          return res.status(400).json({
            status: data.status.message,
            result: data.total_results,
          });
        }
      })
      .catch((error) => {
        console.log("Error", error.message);
        return res.status(500).json({
          message: "Server error",
        });
      });
  },
  getProvince: async (req, res) => {
    try {
      const response = await axios.get("/province");

      return res.status(200).json({
        data: response.data,
      });
    } catch (error) {
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  getCity: async (req, res) => {
    try {
      const response = await axios.get("/city");

      return res.status(200).json({
        data: response.data,
      });
    } catch (error) {
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  getCityByProvince: async (req, res) => {
    try {
      const id = req.params.provId;
      const response = await axios.get(`/city`, {
        params: { province: id },
      });

      return res.status(200).json({
        data: response.data,
      });
    } catch (error) {
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  getExpeditionPrice: async (req, res) => {
    try {
      const { asal, tujuan, berat, kurir } = req.params;

      const response = await axios.post("/cost", {
        origin: asal,
        destination: tujuan,
        weight: berat,
        courier: kurir,
      });

      return res.status(200).json({
        data: response.data,
      });
    } catch (error) {
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  testjson: async (req, res) => {
    try {
      const response = cityjson

      return res.status(200).json({
        data: response
      })
    } catch (error) {
      
    }
  }
};

module.exports = geocodeController;
