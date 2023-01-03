const express = require("express");
const adminSalesController = require("../controllers/adminSalesController");
const { verifyToken } = require("../middlewares/loginMiddleware");

const router = express.Router();

router.get("/", verifyToken, adminSalesController.getAllSalesHistory);
router.get(
  "/branch",
  verifyToken,
  adminSalesController.getSalesHistoryByBranch
);

router.get(
  "/gross-income",
  verifyToken,
  adminSalesController.getAllGrossIncome
);

router.get(
  "/gross-income/branch",
  verifyToken,
  adminSalesController.getAllGrossIncomeByBranch
);

module.exports = router;
