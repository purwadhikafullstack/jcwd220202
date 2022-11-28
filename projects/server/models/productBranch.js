"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductBranch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductBranch.belongsTo(models.Product);
      ProductBranch.belongsTo(models.Branch);
    }
  }
  ProductBranch.init(
    {
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ProductBranch",
    }
  );
  return ProductBranch;
};
