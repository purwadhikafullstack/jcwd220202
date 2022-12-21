const { Op } = require("sequelize");
const db = require("../../models");
const moment = require("moment");

const transactionController = {
    addToCart: async (req, res) => {
        const { ProductBranchId, quantity, total_product_price } = req.body;

        try {
            const conditionDouble = await db.Cart.findOne({
                where: {
                    [Op.and]: [
                        { ProductBranchId: req.body.ProductBranchId },
                        { UserId: req.user.id },
                    ],
                },
            });
            if (conditionDouble) {
                return res.status(400).json({
                    message: "Product already added",
                });
            } else {
                const addProduct = await db.Cart.create({
                    UserId: req.user.id,
                    ProductBranchId,
                    quantity,
                    total_product_price,
                });

                return res.status(200).json({
                    message: "Added to cart",
                    data: addProduct,
                });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: "Server error",
            });
        }
    },
    showUserCart: async (req, res) => {
        const { ProductBranchId, quantity, total_product_price } = req.body;

        try {
            const userCart = await db.Cart.findAll({
                where: {
                    UserId: req.user.id,
                },
                include: [
                    {
                        model: db.ProductBranch,
                        include: [{ model: db.Product }],
                    },
                ],
            });

            return res.status(200).json({
                message: "Showing user cart",
                data: userCart,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: "Server error",
            });
        }
    },
    showUserCart: async (req, res) => {
        const { ProductBranchId, quantity, total_product_price } = req.body;

        try {
            const userCart = await db.Cart.findAll({
                where: {
                    UserId: req.user.id,
                },
                include: [
                    {
                        model: db.ProductBranch,
                        include: [{ model: db.Product }],
                    },
                ],
            });

            return res.status(200).json({
                message: "Showing user cart",
                data: userCart,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: "Server error",
            });
        }
    },
    checkoutItems: async (req, res) => {
        try {
            const currentCart = await db.Cart.findAll({
                where: {
                    UserId: req.user.id,
                },
            });
            // console.log(currentCart.id);
            // console.log(JSON.parse(JSON.stringify()))
            const createTransaction = await db.Transaction.create({
                BranchId: currentCart.BranchId,
                total_price: 7777,
                total_quantity: 888,
                ProductBranchId: currentCart.ProductBranchId,
            });
            currentCart.map((val) => {
                db.TransactionItem.create({
                    TransactionId: createTransaction.id,
                    // applied_discount,
                    current_price: 99999,
                    ProductBranchId: val.ProductBranchId,
                });
            });
            return res.status(200).json({
                message: "Product checked out",
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: "Server error handling cart",
            });
        }
    },
    updatePayment: async (req, res) => {
        try {
            const get = await db.Transaction.findOne({
                where: {
                    id: req.params.id,
                },
                attributes: ["expired_date"],
            });

            const getExpDate = Object.values(get.dataValues);
            const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
            const expDate = moment(getExpDate[0])
                .add(-7, "hours")
                .format("YYYY-MM-DD HH:mm:ss");

            if (currentDate > expDate) {
                return res.status(200).json({
                    message: "Payment expired",
                });
            }

            await db.Transaction.update(
                {
                    payment_proof_img: req.file.filename,
                },
                {
                    where: {
                        id: req.params.id,
                    },
                }
            );

            return res.status(200).json({
                message: "Payment uploaded",
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: "Server error upload payment",
            });
        }
    },
    getTransactionData: async (req, res) => {
        try {
            const get = await db.Transaction.findOne({
                where: {
                    id: req.params.id,
                },
                attributes: ["expired_date", "total_price"],
            });

            const getExpDate = Object.values(get.dataValues);
            const price = Object.values(get.dataValues)[1];
            const expDate = moment(getExpDate[0])
                .add(-7, "hours")
                .format("LLL");

            return res.status(200).json({
                message: "Get successful",
                price,
                expDate,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: err.message,
            });
        }
    },
};

module.exports = transactionController;

// PurwadhikaJCWD2202
