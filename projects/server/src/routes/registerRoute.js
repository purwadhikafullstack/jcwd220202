const express = require("express");
const registerContoller = require("../controllers/registerController");
const { validateUser } = require("../middlewares/validationMiddleware");

const router = express.Router();

router.post("/user", validateUser, registerContoller.registerUser);
router.get("/user/verification", registerContoller.verifyUser);
router.get("/user/reverification", registerContoller.reverifyUser);

module.exports = router;
