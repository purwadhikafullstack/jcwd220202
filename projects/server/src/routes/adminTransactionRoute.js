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
router.patch(
  "/status/:id",
  verifyToken,
  adminTransactionController.updateTransactionStatus
);

module.exports = router;
