const bcrypt = require("bcrypt");
const db = require("../../models");
const { signToken } = require("../../lib/jwt");
const { Op } = require("sequelize");

const userController = {
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      const findUserByEmail = await db.User.findOne({
        where: {
          email: email,
        },
      });

      if (!findUserByEmail) {
        return res.status(400).json({
          message: "User Not Foundddd",
        });
      }

      const passwordValid = bcrypt.compareSync(
        password,
        findUserByEmail.password
      );

      if (!passwordValid) {
        return res.status(400).json({
          message: "Wrong password",
        });
      }

      delete findUserByEmail.dataValues.password;

      const token = signToken({
        id: findUserByEmail.id,
      });

      return res.status(201).json({
        message: "User login",
        data: findUserByEmail,
        token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server Error Login User",
      });
    }
  },
  loginAdmin: async (req, res) => {
    try {
      const { email, password } = req.body;

      const findUserByEmail = await db.User.findOne({
        where: {
          email: email,
        },
        include: [
          {
            model: db.Branch,
          },
        ],
      });

      if (!findUserByEmail) {
        return res.status(400).json({
          message: "Admin Not Found",
        });
      }

      const passwordValid = bcrypt.compareSync(
        password,
        findUserByEmail.password
      );

      if (!passwordValid) {
        return res.status(400).json({
          message: "Wrong password",
        });
      }

      delete findUserByEmail.dataValues.password;

      const token = signToken({
        id: findUserByEmail.id,
      });

      return res.status(201).json({
        message: "Admin login",
        data: findUserByEmail,
        token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server Error Login User",
      });
    }
  },
  keepUserLoggedIn: async (req, res) => {
    try {
      const findUserById = await db.User.findByPk(req.user.id, {
        include: [{ model: db.Branch }],
      });

      const renewedToken = signToken({
        id: req.user.id,
      });

      return res.status(200).json({
        message: "Renewed user token",
        data: findUserById,
        token: renewedToken,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
};

module.exports = userController;
