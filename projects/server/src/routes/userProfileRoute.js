const express = require("express")
const profileController = require("../controllers/profileController")
const { verifyToken } = require("../middlewares/loginMiddleware")
const router = express.Router()
const { uploader } = require("../../lib/uploader")

router.patch(
    "/",
    verifyToken,
    uploader({
        acceptedFileTypes: ["png", "gif", "jpg"],
        filePrefix: "PROF",
    }).single("profile_picture"),
    profileController.updateProfile
)
router.get("/", verifyToken, profileController.detailUser)
router.post("/newAddress", verifyToken, profileController.addNewAddress)
router.get("/address", verifyToken, profileController.showUserAddress)
router.patch("/selectAddress/:id", verifyToken, profileController.selectUserAddress)
router.get("/activeAddress", verifyToken, profileController.activeAddress)
router.delete("/:id", verifyToken, profileController.deleteAddress)

module.exports = router
