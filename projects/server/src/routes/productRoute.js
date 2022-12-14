const express = require("express")
const productController = require("../controllers/productController")
const { verifyToken } = require("../middlewares/loginMiddleware")
const router = express.Router()

router.get("/", productController.showAllProducts)
router.get("/:id", productController.detailProductByPk)

module.exports = router
