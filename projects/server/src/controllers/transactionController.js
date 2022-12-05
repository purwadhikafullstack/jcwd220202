const { Op } = require("sequelize");
const db = require("../../models");

const transactionController = {
  addToCart: async (req, res) => {
    try {
      const conditionDouble = await db.Carts.findOne({
        where: {
          ProductBranchId,
        },
      });
      if (conditionDouble) {
        return res.status(400).json({
          message: "Product already added",
        });
      }

      const addProduct = await Carts.create({
        ProductBranchId: id,
        UserId: req.user.id,
      });
      return res.status(200).json({
        message: "Added to cart",
        data: addProduct,
      });
    } catch (err) {
      console.log(err);
      return res.json(500)({
        message: "Server error",
      });
    }
  },
};

module.exports = transactionController;
