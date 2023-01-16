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
        include: [{ model: db.User }],
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
    const { address, latitude, longitude } = req.body;
    try {
      const registeredAddress = await db.Address.findOne({
        where: {
          [Op.and]: [
            { UserId: req.user.id },
            { latitude: req.body.latitude },
            { longitude: req.body.longitude },
          ],
        },
      });
      if (registeredAddress) {
        return res.status(400).json({
          message: "Address already added",
        });
      } else {
        const newAddress = await db.Address.create({
          address: req.body.address,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          UserId: req.user.id,
        });
        return res.status(200).json({
          message: "User address added",
          data: newAddress,
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  selectUserAddress: async (req, res) => {
    try {
      await db.Address.update(
        {
          is_active: 0,
        },
        {
          where: {
            UserId: req.user.id,
          },
        }
      );

      await db.Address.update(
        {
          is_active: 1,
        },
        { where: { id: req.params.id } }
      );

      await db.User.update(
        {
          AddressId: req.params.id,
        },
        { where: { id: req.user.id } }
      );

      return res.status(200).json({
        message: "Select user address",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error selecting address",
      });
    }
  },
  activeAddress: async (req, res) => {
    try {
      const findUserAddress = await db.User.findOne({
        where: { id: req.user.id },
        include: [{ model: db.Address, where: { is_active: 1 } }],
      });
      return res.status(200).json({
        data: findUserAddress,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Can't find address",
      });
    }
  },
  deleteAddress: async (req, res) => {
    try {
      await db.Address.destroy({
        where: { id: req.params.id },
      });

      return res.status(200).json({
        message: "Address deleted",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Failed to delete address",
      });
    }
  },
};

module.exports = profileController;
