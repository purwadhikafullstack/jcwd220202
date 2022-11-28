const db = require("../../models");

const adminProductController = {
  createProduct: async (req, res) => {
    try {
      const { product_name, product_price, product_description, CategoryId } =
        req.body;

      const findProductName = await db.Product.findOne({
        where: {
          product_name: product_name,
        },
      });

      if (findProductName) {
        return res.status(400).json({
          message: "product name already exist",
        });
      }

      const product_image = `http://localhost:8000/public/${req.file.filename}`;

      const newProduct = await db.Product.create({
        product_name: product_name,
        product_price: Number(product_price),
        product_description: product_description,
        CategoryId: Number(CategoryId),
        product_image: product_image,
      });

      return res.status(200).json({
        data: newProduct,
        message: "product created",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  getAllProductSprAdm: async (req, res) => {
    try {
      const findAllProducts = await db.Product.findAll({
        include: [{ model: db.Category }],
      });

      return res.status(200).json({
        data: findAllProducts,
        message: "get all products",
      });
    } catch (error) {
      res.status(500).json({
        message: "server error",
      });
    }
  },
};

module.exports = adminProductController;
