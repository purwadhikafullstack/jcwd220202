const express = require("express");
const transactionController = require("../controllers/transactionController");
const { verifyToken } = require("../middlewares/loginMiddleware");
const router = express.Router();

router.post("/addcart", verifyToken, transactionController.addToCart);
router.get("/cart", verifyToken, transactionController.showUserCart);
router.post("/checkout", verifyToken, transactionController.checkoutItems);

module.exports = router;
