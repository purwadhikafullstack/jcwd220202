const express = require("express");
const productController = require("../controllers/productController");
const { verifyToken } = require("../middlewares/loginMiddleware");
const router = express.Router();

router.get("/nearest", verifyToken, productController.showAllProducts);
router.get("/:id", verifyToken, productController.detailProductByPk);
// router.get("", productController.findProductByCategory);
router.get(
  "/nearest/:CategoryId",
  verifyToken,
  productController.getNearestProductByCategory
);
router.get("/all-product/guest", productController.showNoUserProduct);

module.exports = router;
