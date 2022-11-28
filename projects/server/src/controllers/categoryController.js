const { Op } = require("sequelize");
const db = require("../../models");

const categoryController = {
  createCategory: async (req, res) => {
    try {
      const { category_name } = req.body;

      const icon_url = `http://localhost:8000/public/${req.file.filename}`;

      const newCategory = await db.Category.create({
        category: category_name,
        icon_url: icon_url,
      });

      return res.status(201).json({
        data: newCategory,
        message: "Created Category",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error create category",
      });
    }
  },
  updateCategory: async (req, res) => {
    try {
      if (req.file) {
        req.body.profile_picture = `http://localhost:8000/public/${req.file.filename}`;
      }

      const { category_name, icon_url } = req.body;

      await db.Category.update(
        {
          category: category_name,
          icon_url: icon_url,
        },
        {
          where: {
            id: req.category.id,
          },
        }
      );
      return res.status(200).json({
        message: "Category updated",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error update category",
      });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      await db.Category.destroy({
        where: {
          id: req.params.id,
        },
      });

      return res.status(200).json({
        message: "Category deleted",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server Error deleting category",
      });
    }
  },
  showAllCategory: async (req, res) => {
    try {
      const seeAllCategory = await db.Category.findAll();

      return res.status(200).json({
        message: "Showing my items in cart",
        data: seeAllCategory,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error get category data",
      });
    }
  },
  getAllCategory: async (req, res) => {
    try {
      const findAllCategory = await db.Category.findAll();

      return res.status(200).json({
        message: "Get All Categories",
        data: findAllCategory,
      });
    } catch (error) {
      return res.status(500).json({
        message: "server error",
      });
    }
  },
};

module.exports = categoryController;
