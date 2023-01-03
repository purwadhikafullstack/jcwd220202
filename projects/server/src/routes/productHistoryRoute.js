const express = require("express");
const productHistoryController = require("../controllers/productHistoryController");
const { verifyToken } = require("../middlewares/loginMiddleware");

const router = express.Router();

router.get("/", verifyToken, productHistoryController.getProductHistory);

module.exports = router;
