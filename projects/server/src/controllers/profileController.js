const { Op } = require("sequelize");
const db = require("../../models");

const profileController = {
  updateProfile: async (req, res) => {
    try {
      if (req.file) {
        req.body.profile_picture = `http://localhost:8000/public/${req.file.filename}`;
      }

      const { name, gender, birth, profile_picture } = req.body;

      await db.User.update(
        {
          name: name,
          gender: gender,
          birth: birth,
          profile_image_url: profile_picture,
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );
      return res.status(200).json({
        message: "Profile updated",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server error updating profile",
      });
    }
  },
  detailUser: async (req, res) => {
    try {
      const findDetailUser = await db.User.findByPk(req.user.id);

      return res.status(200).json({
        message: "Show users detail",
        data: findDetailUser,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server error detail by pk",
      });
    }
  },
  showUserAddress: async (req, res) => {
    try {
      const findAllAddress = await db.Address.findAll({
        where: {
          UserId: req.user.id,
        },
      });

      return res.status(200).json({
        message: "Show user address",
        data: findAllAddress,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Address not found",
      });
    }
  },
  addNewAddress: async (req, res) => {
    const { address } = req.body;
    try {
      const newAddress = await db.Address.create({
        address: address,
      });
      return res.status(200).json({
        message: "User address added",
        data: newAddress,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  selectUserAddress: async (req, res) => {
    try {
      return res.status(200).json({
        message: "Select user address",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error fetching address",
      });
    }
  },
};

module.exports = profileController;
