const express = require("express");
const { verifyToken } = require("../middlewares/loginMiddleware");
const { uploadProduct } = require("../../lib/productUploader");
const adminProductController = require("../controllers/adminProductController");
const { validateAddProduct } = require("../middlewares/addProductMiddleware");
const { validateEditProduct } = require("../middlewares/editProductMiddleware");
const {
  validateEditProductBranch,
} = require("../middlewares/editProductBranchMiddleware");

const router = express.Router();

router.post(
  "/",
  verifyToken,
  uploadProduct({
    acceptedFileTypes: ["png", "jpeg", "jpg"],
    // filePrefix: "PRODUCT",
  }).single("product_image"),
  validateAddProduct,
  adminProductController.createProduct
);

router.get(
  "/super-admin",
  verifyToken,
  adminProductController.getAllProductSprAdm
);

router.get(
  "/branch",
  verifyToken,
  adminProductController.getAllProductByBranch
);

router.get(
  "/super-admin/:id",
  verifyToken,
  adminProductController.getProductByIdSprAdm
);

router.patch(
  "/super-admin/:id",
  verifyToken,
  uploadProduct({
    acceptedFileTypes: ["png", "jpeg", "jpg"],
    // filePrefix: "PRODUCT",
  }).single("product_image"),
  validateEditProduct,
  adminProductController.editProductByIdSprAdm
);

router.get(
  "/branch/:id",
  verifyToken,
  adminProductController.getProductByIdAdmin
);

router.patch(
  "/branch/:id",
  verifyToken,
  adminProductController.editProductByIdAdmin
);

router.delete(
  "/super-admin/:id",
  verifyToken,
  adminProductController.deleteProductByIdSprAdm
);

router.get(
  "/super-admin/restore/:id",
  verifyToken,
  adminProductController.restoreProductById
);

router.post(
  "/upload",
  uploadProduct({
    acceptedFileTypes: ["png", "jpeg", "jpg"],
    // filePrefix: "PICTURE",
  }).single("product_image"),
  (req, res) => {
    res.status(200).json({
      message: "upload file",
    });
  }
);

module.exports = router;
