const express = require("express")
const geocodeController = require("../controllers/geocodeController")
const router = express.Router()

// router.get("/distance/:id", geocodeController.distanceStoreToUser)
router.get("/userloc", geocodeController.userLocation)
router.post("/addresspick", geocodeController.userAddressSelect)

module.exports = router
