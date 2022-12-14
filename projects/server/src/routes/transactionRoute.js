const express = require("express")
const transactionController = require("../controllers/transactionController")
const { verifyToken } = require("../middlewares/loginMiddleware")
const router = express.Router()
const { uploader } = require("../../lib/uploader")

// router.post("/:id", transactionController.addToCart)

router.post("/", transactionController.createPayment)
router.patch(
    "/:id",
    uploader({
        acceptedFileTypes: ["png", "jpg"],
        // filePrefix: "PROF",
    }).single("payment_proof_img"),
    transactionController.updatePayment
)

module.exports = router
