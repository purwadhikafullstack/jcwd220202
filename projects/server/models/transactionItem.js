"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransactionItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TransactionItem.hasOne(models.ProductHistory);
      TransactionItem.belongsTo(models.Transaction);
      TransactionItem.belongsTo(models.ProductBranch);
    }
  }
  TransactionItem.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
      },
      price_per_product: {
        type: DataTypes.INTEGER,
      },
      applied_discount: {
        type: DataTypes.INTEGER,
      },
      current_price: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "TransactionItem",
    }
  );
  return TransactionItem;
};
