"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ReferralVoucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ReferralVoucher.belongsTo(models.User);
      ReferralVoucher.hasOne(models.Transaction);
    }
  }
  ReferralVoucher.init(
    {
      voucher_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_voucher_used: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      discount_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ReferralVoucher",
    }
  );
  return ReferralVoucher;
};
