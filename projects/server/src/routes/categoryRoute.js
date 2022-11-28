const express = require("express");
const categoryController = require("../controllers/categoryController");
const { upload } = require("../../lib/upload");

const router = express.Router();

router.post(
  "/",
  upload({
    acceptedFileTypes: ["png", "jpeg", "jpg"],
    filePrefix: "POST",
  }).single("icon_url"),
  categoryController.createCategory
);
router.get("/", categoryController.showAllCategory);
router.delete("/:id", categoryController.deleteCategory);

router.patch(
  "/",
  upload({
    acceptedFileTypes: ["png", "jpeg", "jpg"],
    filePrefix: "PROF",
  }).single("icon_url"),
  categoryController.createCategory
);

module.exports = router;
