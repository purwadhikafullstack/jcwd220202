const express = require("express")
const productController = require("../controllers/productController")
const { verifyToken } = require("../middlewares/loginMiddleware")
const router = express.Router()

router.get("/", productController.showAllProducts)

module.exports = router
