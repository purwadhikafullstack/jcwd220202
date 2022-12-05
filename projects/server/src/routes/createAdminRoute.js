const express = require("express");
const createAdminController = require("../controllers/createAdminController");

const router = express.Router();

router.post("/", createAdminController.createAdmin);

module.exports = router;
