"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Branch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Branch.hasMany(models.ProductBranch);
     }
  }
  Branch.init(
    {
      branch_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      branch_address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      distance: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Branch",
    }
  );
  return Branch;
};
