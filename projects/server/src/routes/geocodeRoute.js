const express = require("express")
const geocodeController = require("../controllers/geocodeController")
const router = express.Router()

// router.get("/distance/:id", geocodeController.distanceStoreToUser)
router.post("/userloc", geocodeController.userLocation)
router.get("/city", geocodeController.getCity)
router.get("/expeditionprice/:asal/:tujuan/:berat/:kurir", geocodeController.getExpeditionPrice)
router.get("/json", geocodeController.testjson)


module.exports = router
