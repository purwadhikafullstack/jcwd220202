const express = require("express");
const categoryController = require("../controllers/categoryController");
const { uploader } = require("../../lib/uploader");

const { verifyToken } = require("../middlewares/loginMiddleware");

const router = express.Router();

router.post(
    "/",
    uploader({
        acceptedFileTypes: ["png", "jpeg", "jpg"],
        filePrefix: "POST",
    }).single("icon_url"),
    verifyToken,
    categoryController.createCategory
);

router.delete("/:id", verifyToken, categoryController.deleteCategory);
router.get("/", verifyToken, categoryController.getAllCategory);
router.get("/:id", verifyToken, categoryController.findCategoryByPk);
router.get("/active/all", verifyToken, categoryController.getAllActiveCategory);

router.patch(
    "/:id",
    uploader({
        acceptedFileTypes: ["png", "jpeg", "jpg"],
        filePrefix: "PROF",
    }).single("icon_url"),
    verifyToken,
    categoryController.updateCategory
);

module.exports = router;
