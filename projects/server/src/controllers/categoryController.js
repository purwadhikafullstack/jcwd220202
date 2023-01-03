const { Op, where } = require("sequelize");
const db = require("../../models");
const fs = require("fs");

const categoryController = {
  createCategory: async (req, res) => {
    try {
      const { category_name } = req.body;

      const findCategory = await db.Category.findOne({
        where: {
          category_name: category_name,
        },
      });

      if (findCategory) {
        return res.status(400).json({
          message: "category name already exist",
        });
      }

      const icon_url = `http://localhost:8000/public/${req.file.filename}`;

      const newCategory = await db.Category.create({
        category_name: category_name,
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
        req.body.icon_url = `http://localhost:8000/public/${req.file.filename}`;
      }

      const { category_name, icon_url } = req.body;

      await db.Category.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (req.body.icon_url) {
        const findCategory = await db.Category.findByPk(req.params.id);

        fs.unlinkSync(`public/${findCategory.icon_url.split("/")[4]}`);
      }

      await db.Category.update(
        {
          ...req.body,
        },
        {
          where: {
            id: req.params.id,
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
      const findCategory = await db.Category.findByPk(req.params.id);

      fs.unlinkSync(`public/${findCategory.icon_url.split("/")[4]}`);

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
  getAllActiveCategory: async (req, res) => {
    try {
      const {
        category_name = "",
        _sortBy = "category_name",
        _sortDir = "ASC",
        _limit = 12,
        _page = 1,
      } = req.query;

      if (_sortBy === "category_name" || category_name) {
        const getAllCategory = await db.Category.findAndCountAll({
          limit: Number(_limit),
          offset: (_page - 1) * _limit,
          order: [[_sortBy, _sortDir]],
          where: {
            [Op.or]: [
              {
                category_name: {
                  [Op.like]: `%${category_name}%`,
                },
              },
            ],
          },
        });

        return res.status(200).json({
          message: "Get All Categories",
          data: getAllCategory.rows,
          dataCount: getAllCategory.count,
        });
      }

      const getAllCategory = await db.Category.findAndCountAll({
        limit: Number(_limit),
        offset: (_page - 1) * _limit,
      });

      return res.status(200).json({
        message: "Get All Categories",
        data: getAllCategory.rows,
        dataCount: getAllCategory.count,
      });
    } catch (error) {
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  getAllCategory: async (req, res) => {
    try {
      const findAllCategory = await db.Category.findAll();

      return res.status(200).json({
        message: "get all category",
        data: findAllCategory,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  findCategoryByPk: async (req, res) => {
    try {
      const findCategory = await db.Category.findByPk(req.params.id);

      return res.status(200).json({
        message: "Showing category details",
        data: findCategory,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Server error fetching details",
      });
    }
  },
};

module.exports = categoryController;
