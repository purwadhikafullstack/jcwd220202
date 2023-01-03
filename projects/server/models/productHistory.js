"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductHistory.belongsTo(models.Product);
      ProductHistory.belongsTo(models.Branch);
    }
  }
  ProductHistory.init(
    {
      initial_stock: {
        type: DataTypes.INTEGER,
      },
      current_stock: {
        type: DataTypes.INTEGER,
      },
      remarks: {
        type: DataTypes.STRING,
      },
      stock_movement: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "ProductHistory",
    }
  );
  return ProductHistory;
};
