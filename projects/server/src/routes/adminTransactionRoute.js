const express = require("express");
const adminTransactionController = require("../controllers/adminTransactionController");
const { verifyToken } = require("../middlewares/loginMiddleware");

const router = express.Router();

router.get("/", verifyToken, adminTransactionController.getAllTransactionAdmin);

router.get(
  "/:id",
  verifyToken,
  adminTransactionController.getTransactionDetailAdmin
);

router.get(
  "/active/order",
  verifyToken,
  adminTransactionController.getAvailableTransaction
);

router.get(
  "/active/product-send",
  verifyToken,
  adminTransactionController.getProductToSend
);

router.patch(
  "/status/:id",
  verifyToken,
  adminTransactionController.updateTransactionStatus
);

module.exports = router;
