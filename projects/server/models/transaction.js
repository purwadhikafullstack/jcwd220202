"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The models/index file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.ReferralVoucher);
      Transaction.belongsTo(models.User);
      Transaction.belongsTo(models.Branch);
      Transaction.belongsTo(models.Voucher);
      Transaction.hasMany(models.TransactionItem);
    }
  }
  Transaction.init(
    {
      total_quantity: {
        type: DataTypes.INTEGER,
      },
      total_price: {
        type: DataTypes.INTEGER,
      },
      shipping_method: {
        type: DataTypes.STRING,
      },
      payment_proof_img: {
        type: DataTypes.STRING,
      },
      transaction_status: {
        type: DataTypes.STRING,
      },
      shipment_price: {
        type: DataTypes.INTEGER,
      },
      expired_date: {
        type: DataTypes.DATE,
      },
      shipping_address: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
