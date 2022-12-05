const { Op } = require("sequelize");
const db = require("../../models");

Products = db.Product;

const productController = {
  showAllProducts: async (req, res) => {
    try {
      const last_id = parseInt(req.query._lastId) || 0;
      const limit = parseInt(req.query._limit) || 6;
      const search = req.query._keywordHandler || "";
      const order = req.query._sortDir || "DESC";

      let result = [];
      if (last_id < 1) {
        const results = await Products.findAll({
          where: {
            [Op.or]: [
              {
                product_name: {
                  [Op.like]: "%" + search + "%",
                },
              },
              {
                product_price: {
                  [Op.like]: "%" + search + "%",
                },
              },
            ],
          },
          limit: limit,
          order: [["id", order]],
        });
        result = results;
      } else {
        const results = await Products.findAll({
          where: {
            id: {
              [Op.lt]: last_id,
            },
            product_name: { [Op.like]: "%" + search + "%" },
          },
          limit: limit,
          order: [["id", order]],
        });
        result = results;
      }

      return res.status(200).json({
        message: "Showing all products",
        result: result,
        lastId: result.length ? result[result.length - 1].id : 0,
        hasMore: result.length >= limit ? true : false,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server error showing products",
      });
    }
  },
};

module.exports = productController;
