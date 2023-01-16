const opencage = require("opencage-api-client");
const db = require("../../models");
const { signToken } = require("../../lib/jwt");
const { Op, QueryTypes } = require("sequelize");
const { sequelize } = require("../../models");
const axios = require("axios");
const cityjson = require("../../public/citycode.json");
const fs = require("fs");

axios.defaults.baseURL = "https://api.rajaongkir.com/starter";
axios.defaults.headers.common["key"] = process.env.RAJAONGKIR_API_KEY;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

const geocodeController = {
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
        key: process.env.OPENCAGE_API_KEY,
      })
      .then(async (data) => {
        if (data.results.length > 0) {
          const place = data.results[0];

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
      const response = cityjson;

      return res.status(200).json({
        data: response,
      });
    } catch (error) {}
  },
};

module.exports = geocodeController;
