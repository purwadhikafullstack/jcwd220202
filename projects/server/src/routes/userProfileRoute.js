const express = require("express")
const profileController = require("../controllers/profileController")
const { verifyToken } = require("../middlewares/loginMiddleware")
const router = express.Router()
const { upload } = require("../../lib/upload")

// router.patch("/", verifyToken, profileController.updateProfile)
router.patch(
    "/",
    verifyToken,
    upload({
        acceptedFileTypes: ["png", "jpeg", "jpg"],
        filePrefix: "PROF",
    }).single("profile_picture"),
    profileController.updateProfile
)
router.get("/", verifyToken, profileController.detailUser)
router.post("/", verifyToken, profileController.addNewAddress)
router.get("/address", verifyToken, profileController.showUserAddress)

module.exports = router
