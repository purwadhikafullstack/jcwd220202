const express = require("express");
const loginController = require("../controllers/loginController");
const { verifyToken } = require("../middlewares/loginMiddleware");
const router = express.Router();

router.post("/api/login", loginController.loginUser);
router.get("/api/refreshToken", verifyToken, loginController.keepUserLoggedIn);

module.exports = router;
