const express = require("express");
const adminVoucherController = require("../controllers/adminVoucherController");
const { verifyToken } = require("../middlewares/loginMiddleware");
const {
  validateBuy1Get1Voucher,
} = require("../middlewares/addBuy1Get1VoucherMiddleware");
const {
  validateAddDiscountVoucher,
} = require("../middlewares/addDiscountVoucherMiddleware");
const {
  validateFreeShipmentVoucher,
} = require("../middlewares/addFreeShipmentVoucherMiddleware");

const router = express.Router();

router.post(
  "/voucher-discount",
  verifyToken,
  validateAddDiscountVoucher,
  adminVoucherController.createDiscountVoucher
);
router.post(
  "/free-shipment",
  verifyToken,
  // validateFreeShipmentVoucher,
  adminVoucherController.createFreeShipmentVoucher
);
router.post(
  "/buy1-get1",
  verifyToken,
  validateBuy1Get1Voucher,
  adminVoucherController.createBuy1Get1Voucher
);

router.get("/", verifyToken, adminVoucherController.getAllVoucherByBranch);

router.get("/type", verifyToken, adminVoucherController.getVoucherType);

router.delete("/:id", verifyToken, adminVoucherController.deleteVoucherById);

router.get("/active", verifyToken, adminVoucherController.getActiveVoucher);

module.exports = router;
