"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SalesReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SalesReport.belongsTo(models.Branch);
    }
  }
  SalesReport.init(
    {
      today_gross_income: {
        type: DataTypes.INTEGER,
      },
      today: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "SalesReport",
    }
  );
  return SalesReport;
};
