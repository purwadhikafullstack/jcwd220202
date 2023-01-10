const express = require("express");
const adminBranchController = require("../controllers/adminBranchController");
const { verifyToken } = require("../middlewares/loginMiddleware");

const router = express.Router();

router.get("/", verifyToken, adminBranchController.getAllBranch);

module.exports = router;
