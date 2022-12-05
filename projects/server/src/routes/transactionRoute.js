const express = require("express");
const loginController = require("../controllers/transactionController");
const { verifyToken } = require("../middlewares/loginMiddleware");
const router = express.Router();

router.post("/:id", loginController.addToCart);

module.exports = router;
