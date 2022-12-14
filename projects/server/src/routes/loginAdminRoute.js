const express = require("express");
const loginController = require("../controllers/loginController");
const { verifyToken } = require("../middlewares/loginMiddleware");
const router = express.Router();

router.post("/login", loginController.loginAdmin);

module.exports = router;
