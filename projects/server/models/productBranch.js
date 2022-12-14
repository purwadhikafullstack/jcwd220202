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
      ProductBranch.hasMany(models.Cart);
      ProductBranch.hasMany(models.TransactionItem);
    }
  }
  ProductBranch.init(
    {
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
      discount_amount_percentage: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
      discount_amount_nominal: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
      is_DeletedInBranch: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "ProductBranch",
      paranoid: true,
      timestamps: true,
    }
  );
  return ProductBranch;
};
