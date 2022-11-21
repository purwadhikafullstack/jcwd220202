const express = require("express")
const loginController = require("../controllers/loginController")
const { verifyToken } = require("../middlewares/loginMiddleware")
const router = express.Router()

router.get("/loginn", verifyToken, loginController.loginAdmin)

module.exports = router
