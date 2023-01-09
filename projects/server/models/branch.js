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
      Branch.belongsTo(models.User);
      Branch.hasMany(models.ProductHistory);
      Branch.hasMany(models.Transaction);
      Branch.hasMany(models.Voucher);
      Branch.belongsTo(models.Address);
    }
  }
  Branch.init(
    {
      branch_name: {
        type: DataTypes.STRING,
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
