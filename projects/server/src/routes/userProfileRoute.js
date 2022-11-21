const express = require("express")
const profileController = require("../controllers/profileController")
const { verifyToken } = require("../middlewares/loginMiddleware")
const router = express.Router()

router.patch("/", verifyToken, profileController.updateProfile)
router.get("/", verifyToken, profileController.detailUser)
router.post("/", verifyToken,  profileController.addNewAddress)
router.get("/address", verifyToken,  profileController.showUserAddress)


module.exports = router
