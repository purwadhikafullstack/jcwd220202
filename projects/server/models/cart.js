"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.ProductBranch)
      Cart.belongsTo(models.User)
     }
  }
  Cart.init(
    {
      is_checked: {
        type: DataTypes.BOOLEAN,
      },
      
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
