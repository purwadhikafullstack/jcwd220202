const express = require("express")
const loginController = require("../controllers/geocodeController")
const router = express.Router()

router.get("/distance", loginController.distanceStoreToUser)
router.get("/userloc", loginController.userLocation)
router.post("/addresspick", loginController.userAddressSelect)

module.exports = router
