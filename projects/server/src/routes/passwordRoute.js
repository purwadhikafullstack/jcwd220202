const express = require("express")
const passwordController = require("../controllers/passwordController")
const { verifyToken } = require("../middlewares/loginMiddleware")

const router = express.Router()

router.post("/forgot", passwordController.sendEmail)
router.patch("/reset", passwordController.resetPassword)
router.patch("/change", verifyToken, passwordController.changePassword)

module.exports = router
