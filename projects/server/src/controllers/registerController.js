const db = require("../../models");
const user = require("../../models/user");
const bcrypt = require("bcrypt");
const {
  createVerificationToken,
  validateVerificationToken,
} = require("../../lib/verification");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const emailer = require("../../lib/emailer");

const registerContoller = {
  registerUser: async (req, res) => {
    try {
      const { email, password, phone_number, referral_code } = req.body;

      const findUserByEmail = await db.User.findOne({
        where: {
          email: email,
        },
      });

      if (findUserByEmail) {
        return res.status(400).json({
          message: "email has been used",
        });
      }

      const hashedPassword = bcrypt.hashSync(password, 5);

      const defaultUsername = (email) => {
        const splitEmail = email.split("@");

        return splitEmail[0];
      };

      const myReferralCode = (length) => {
        let result = "";
        let characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%$#!@&";
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        return result;
      };

      const findUserRole = await db.Role.findAll({
        where: {
          role_name: "user",
        },
      });

      const parseUserRole = JSON.parse(JSON.stringify(findUserRole));

      if (email && password && phone_number && !referral_code) {
        const newUser = await db.User.create({
          email: email,
          password: hashedPassword,
          phone_number: phone_number,
          username: defaultUsername(email),
          my_referral_code: myReferralCode(6),
          RoleId: parseUserRole[0].id,
        });

        const verification_token = createVerificationToken({
          id: newUser.id,
        });

        const verificationLink = `http://localhost:8000/register/user/verification?verification_token=${verification_token}`;

        const parentDir = path.resolve(__dirname, "..", "..");
        const exactFile = path.join(
          parentDir,
          "templates",
          "register_user.html"
        );

        const rawHTML = fs.readFileSync(exactFile, "utf-8");
        const compiledHTML = handlebars.compile(rawHTML);

        const htmlResult = compiledHTML({
          username: defaultUsername(email),
          verificationLink: verificationLink,
        });

        await emailer({
          to: email,
          html: htmlResult,
          subject: "verify your account",
          text: "please verify your account",
        });

        return res.status(200).json({
          message: "User Registered",
          data: newUser,
          voucher: "no voucher created",
        });
      }

      const findUserReferralCode = await db.User.findOne({
        where: {
          my_referral_code: referral_code,
        },
      });

      if (!findUserReferralCode) {
        return res.status(400).json({
          message: "referral code doesn't exist or just leave it empty",
        });
      }

      const newUser = await db.User.create({
        email: email,
        password: hashedPassword,
        phone_number: phone_number,
        referral_code: referral_code,
        username: defaultUsername(email),
        my_referral_code: myReferralCode(6),
        RoleId: parseUserRole[0].id,
      });

      if (findUserReferralCode) {
        await db.ReferralVoucher.create({
          UserId: newUser.id,
          voucher_name: "voucher discount referral",
          discount_amount: 10000,
          is_voucher_used: false,
        });
      }

      const findUserVoucher = await db.ReferralVoucher.findOne({
        where: {
          UserId: newUser.id,
        },
      });

      const verification_token = createVerificationToken({
        id: newUser.id,
      });

      const verificationLink = `http://localhost:8000/register/user/verification?verification_token=${verification_token}`;

      const parentDir = path.resolve(__dirname, "..", "..");
      const exactFile = path.join(parentDir, "templates", "register_user.html");

      const rawHTML = fs.readFileSync(exactFile, "utf-8");

      const compiledHTML = handlebars.compile(rawHTML);

      const htmlResult = compiledHTML({
        username: defaultUsername(email),
        verificationLink: verificationLink,
      });

      await emailer({
        to: email,
        html: htmlResult,
        subject: "verify your account",
        text: "please verify your account",
      });

      return res.status(200).json({
        message: "User Registered",
        data: newUser,
        voucher: findUserVoucher,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  verifyUser: async (req, res) => {
    try {
      const { verification_token } = req.query;

      const validToken = validateVerificationToken(verification_token);

      if (!validToken) {
        return res.status(401).json({
          message: "Token Invalid",
        });
      }

      await db.User.update(
        { is_verified: true },
        {
          where: {
            id: validToken.id,
          },
        }
      );

      return res.redirect("http://localhost:3000/login/user");
    } catch (error) {
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  reverifyUser: async (req, res) => {
    try {
      const findUserById = await db.User.findByPk(req.user.id);

      const verification_token = createVerificationToken({
        id: findUserById.id,
      });

      const verificationLink = `http://localhost:8000/register/user/reverification-account?verification_token=${verification_token}`;

      const parentDir = path.resolve(__dirname, "..", "..");
      const exactFile = path.join(parentDir, "templates", "register_user.html");

      const rawHTML = fs.readFileSync(exactFile, "utf-8");

      const compiledHTML = handlebars.compile(rawHTML);
      const htmlResult = compiledHTML({
        username: findUserById.username,
        verificationLink,
      });

      await emailer({
        to: findUserById.email,
        html: htmlResult,
        subject: "Verify your account",
        text: "please verify your account",
      });

      return res.status(200).json({
        message: "Verification email sent",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  verifyUserWhenLoggedIn: async (req, res) => {
    try {
      const { verification_token } = req.query;

      const validToken = validateVerificationToken(verification_token);

      if (!validToken) {
        return res.status(401).json({
          message: "Token Invalid",
        });
      }

      await db.User.update(
        { is_verified: true },
        {
          where: {
            id: validToken.id,
          },
        }
      );

      return res.redirect("http://localhost:3000/profile");
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
};

module.exports = registerContoller;
