"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Voucher.hasOne(models.Transaction);
      Voucher.belongsTo(models.Branch);
      Voucher.belongsTo(models.VoucherType);
      Voucher.belongsTo(models.Product);
    }
  }
  Voucher.init(
    {
      voucher_name: {
        type: DataTypes.STRING,
      },
      discount_amount_nominal: {
        type: DataTypes.INTEGER,
      },
      discount_amount_percentage: {
        type: DataTypes.INTEGER,
      },
      voucher_start_date: {
        type: DataTypes.DATE,
      },
      voucher_end_date: {
        type: DataTypes.DATE,
      },
      minimum_payment: {
        type: DataTypes.INTEGER,
      },
      minimum_transaction_done: {
        type: DataTypes.INTEGER,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      is_expired: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Voucher",
    }
  );
  return Voucher;
};
