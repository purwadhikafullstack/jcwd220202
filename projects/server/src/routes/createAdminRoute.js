const express = require("express");
const createAdminController = require("../controllers/createAdminController");
const { verifyToken } = require("../middlewares/loginMiddleware");

const router = express.Router();

router.post("/", verifyToken, createAdminController.createAdmin);

module.exports = router;
