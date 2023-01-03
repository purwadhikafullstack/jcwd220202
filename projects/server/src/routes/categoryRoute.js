const express = require("express");
const categoryController = require("../controllers/categoryController");
const { uploader } = require("../../lib/uploader");

const router = express.Router();

router.post(
  "/",
  uploader({
    acceptedFileTypes: ["png", "jpeg", "jpg"],
    filePrefix: "POST",
  }).single("icon_url"),
  categoryController.createCategory
);

router.delete("/:id", categoryController.deleteCategory);
router.get("/", categoryController.getAllCategory);
router.get("/:id", categoryController.findCategoryByPk);
router.get("/active/all", categoryController.getAllActiveCategory);

router.patch(
  "/:id",
  uploader({
    acceptedFileTypes: ["png", "jpeg", "jpg"],
    filePrefix: "PROF",
  }).single("icon_url"),
  categoryController.updateCategory
);

module.exports = router;
