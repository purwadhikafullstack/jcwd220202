const express = require("express");
const adminBranchController = require("../controllers/adminBranchController");

const router = express.Router();

router.get("/", adminBranchController.getAllBranch);

module.exports = router;
