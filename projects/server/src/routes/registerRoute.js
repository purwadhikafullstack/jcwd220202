const express = require("express");
const registerContoller = require("../controllers/registerController");
const { validateUser } = require("../middlewares/validationMiddleware");
const { verifyToken } = require("../middlewares/loginMiddleware");

const router = express.Router();

router.post("/user", validateUser, registerContoller.registerUser);
router.get("/user/verification", registerContoller.verifyUser);
router.get("/user/reverification", verifyToken, registerContoller.reverifyUser);
router.get(
  "/user/reverification-account/",
  registerContoller.verifyUserWhenLoggedIn
);

module.exports = router;
