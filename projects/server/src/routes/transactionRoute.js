const express = require("express");
const transactionController = require("../controllers/transactionController");
const { verifyToken } = require("../middlewares/loginMiddleware");
const router = express.Router();
const { uploader } = require("../../lib/uploader");

router.post("/addcart", verifyToken, transactionController.addToCart);
router.get("/cart", verifyToken, transactionController.showUserCart);
router.post("/checkout", verifyToken, transactionController.checkoutItems);
router.patch("/update", verifyToken, transactionController.updateQuantity);
router.delete("/:id", verifyToken, transactionController.deleteItem);
router.get("/orders/:id", verifyToken, transactionController.orderItems);
router.post("/payout", verifyToken, transactionController.payOrder);
router.get(
  "/checkvoucher/:id",
  verifyToken,
  transactionController.getAllVoucher
);
router.patch(
  "/payment-with-voucher/:id",
  verifyToken,
  transactionController.useVoucher
);
router.get("/shipment", verifyToken, transactionController.shipmentCourse);
router.get(
  "/user-transaction",
  verifyToken,
  transactionController.allUserTransactions
);

router.patch(
  "/payment-done/check/:id",
  verifyToken,
  uploader({
    acceptedFileTypes: ["png", "jpg", "jpeg"],
    filePrefix: "PROF",
  }).single("payment_proof_img"),
  transactionController.updatePayment
);
router.get(
  "/payment-final/:id",
  verifyToken,
  transactionController.getTransactionData
);
router.post("/", transactionController.createPayment);
router.get(
  "/all-transaction",
  verifyToken,
  transactionController.getAllTransactionUser
);
router.get(
  "/detail-transaction/:id",
  verifyToken,
  transactionController.userTransactionById
);
router.post("/history/:id", verifyToken, transactionController.orderAccepted);

module.exports = router;
