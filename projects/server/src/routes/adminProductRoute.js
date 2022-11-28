const express = require("express");
const { verifyToken } = require("../middlewares/loginMiddleware");
const { uploadProduct } = require("../../lib/productUploader");
const adminProductController = require("../controllers/adminProductController");
const { validateAddProduct } = require("../middlewares/addProductMiddleware");

const router = express.Router();

router.post(
  "/",
  verifyToken,
  uploadProduct({
    acceptedFileTypes: ["png", "jpeg", "jpg"],
    filePrefix: "PRODUCT",
  }).single("product_image"),
  validateAddProduct,
  adminProductController.createProduct
);

router.get("/", verifyToken, adminProductController.getAllProductSprAdm);

router.post(
  "/upload",
  uploadProduct({
    acceptedFileTypes: ["png", "jpeg", "jpg"],
    filePrefix: "PICTURE",
  }).single("product_image"),
  (req, res) => {
    res.status(200).json({
      message: "upload file",
    });
  }
);

module.exports = router;
