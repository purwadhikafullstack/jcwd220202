"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Transaction extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Transaction.init(
        {
            total_quantity: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            total_price: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            shipping_method: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            payment_proof_img: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            transaction_status_name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "Transaction",
        }
    )
    return Transaction
}
