const db = require("../../models");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const emailer = require("../../lib/emailer");

const adminTransactionController = {
  getAllTransactionAdmin: async (req, res) => {
    try {
      const {
        username = "",
        transaction_status = "",
        _sortBy = "createdAt",
        _sortDir = "ASC",
        _limit = 12,
        _page = 1,
      } = req.query;

      const findAdmin = await db.Branch.findOne({
        where: {
          UserId: req.user.id,
        },
      });

      if (_sortBy === "createdAt" || username || transaction_status) {
        if (!transaction_status) {
          const findAllTransaction = await db.Transaction.findAndCountAll({
            limit: Number(_limit),
            offset: (_page - 1) * _limit,
            where: {
              BranchId: findAdmin.id,
            },
            include: [
              {
                model: db.User,
                where: {
                  [Op.or]: [
                    {
                      username: {
                        [Op.like]: `%${username}%`,
                      },
                    },
                  ],
                },
              },
              {
                model: db.TransactionItem,
                separate: true,
                include: [
                  {
                    model: db.ProductBranch,
                    include: [
                      {
                        model: db.Product,
                        paranoid: false,
                      },
                    ],
                  },
                ],
              },
            ],
            order: [[_sortBy, _sortDir]],
          });

          return res.status(200).json({
            message: "get all user transaction",
            data: findAllTransaction.rows,
            dataCount: findAllTransaction.count,
          });
        }

        const findAllTransaction = await db.Transaction.findAndCountAll({
          limit: Number(_limit),
          offset: (_page - 1) * _limit,
          where: {
            BranchId: findAdmin.id,
            transaction_status: transaction_status,
          },
          include: [
            {
              model: db.User,
              where: {
                [Op.or]: [
                  {
                    username: {
                      [Op.like]: `%${username}%`,
                    },
                  },
                ],
              },
            },
            {
              model: db.TransactionItem,
              separate: true,
              include: [
                {
                  model: db.ProductBranch,
                  include: [
                    {
                      model: db.Product,
                      paranoid: false,
                    },
                  ],
                },
              ],
            },
          ],
          order: [[_sortBy, _sortDir]],
        });

        return res.status(200).json({
          message: "get all user transaction",
          data: findAllTransaction.rows,
          dataCount: findAllTransaction.count,
        });
      }

      const findAllTransaction = await db.Transaction.findAndCountAll({
        limit: Number(_limit),
        offset: (_page - 1) * _limit,
        where: {
          BranchId: findAdmin.id,
        },
        include: [
          {
            model: db.User,
          },
          {
            model: db.TransactionItem,
            separate: true,
            include: [
              {
                model: db.ProductBranch,
                include: [
                  {
                    model: db.Product,
                    paranoid: false,
                  },
                ],
              },
            ],
          },
        ],
      });

      return res.status(200).json({
        message: "get all user transaction",
        data: findAllTransaction.rows,
        dataCount: findAllTransaction.count,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  getTransactionDetailAdmin: async (req, res) => {
    try {
      const findAdmin = await db.Branch.findOne({
        where: {
          UserId: req.user.id,
        },
      });

      const findTransactionById = await db.Transaction.findOne({
        where: {
          id: req.params.id,
          BranchId: findAdmin.id,
        },
        include: [
          {
            model: db.User,
            include: db.Address,
          },
          {
            model: db.TransactionItem,
            include: [
              {
                model: db.ProductBranch,
                include: [
                  {
                    model: db.Product,
                  },
                ],
              },
            ],
          },
          {
            model: db.ReferralVoucher,
          },
          {
            model: db.Voucher,
            include: [
              {
                model: db.Product,
                include: db.ProductBranch,
              },
              {
                model: db.VoucherType,
              },
            ],
          },
        ],
      });

      return res.status(200).json({
        message: "get transaction by branch and id",
        data: findTransactionById,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  updateTransactionStatus: async (req, res) => {
    try {
      const { transaction_status, note_to_customer } = req.body;
      const { id } = req.params;

      const findAdmin = await db.Branch.findOne({
        where: {
          UserId: req.user.id,
        },
      });

      const findTransaction = await db.Transaction.findOne({
        where: {
          BranchId: findAdmin.id,
          id: id,
        },
      });

      const findUserWhoShop = await db.User.findOne({
        where: {
          id: findTransaction.UserId,
        },
      });

      if (transaction_status === findTransaction.transaction_status) {
        return res.status(200).json({
          message: "updated but not sending the email",
        });
      }

      if (
        transaction_status === "Payment Approved" ||
        transaction_status === "Product In Shipment" ||
        transaction_status === "Success"
      ) {
        await db.Transaction.update(
          {
            transaction_status: transaction_status,
          },
          {
            where: {
              BranchId: findAdmin.id,
              id: id,
            },
          }
        );

        // const rawHTML = fs.readFileSync(
        //   "templates/transaction_status.html",
        //   "utf-8"
        // );

        const parentDir = path.resolve(__dirname, "..", "..");
        const exactFile = path.join(
          parentDir,
          "templates",
          "transaction_status.html"
        );

        const rawHTML = fs.readFileSync(exactFile, "utf-8");

        const compiledHTML = handlebars.compile(rawHTML);

        const htmlResult = compiledHTML({
          username: findUserWhoShop.username,
          transactionId: req.params.id,
          transactionDate: findTransaction.createdAt
            .toISOString()
            .split("T")[0],
          transactionStatus: transaction_status,
          noteForCustomer: "-",
        });

        await emailer({
          to: findUserWhoShop.email,
          html: htmlResult,
          subject: "Transaction Status",
          text: "User Transaction Status",
        });

        return res.status(200).json({
          message: `transaction status updated to ${transaction_status}`,
        });
      } else if (
        transaction_status === "Cancel" ||
        transaction_status === "Waiting For Payment" ||
        transaction_status === "Waiting For Approval"
      ) {
        await db.Transaction.update(
          {
            transaction_status: transaction_status,
          },
          {
            where: {
              BranchId: findAdmin.id,
              id: id,
            },
          }
        );

        if (
          transaction_status === "Waiting For Payment" ||
          transaction_status === "Waiting For Approval"
        ) {
          // const rawHTML = fs.readFileSync(
          //   "templates/transaction_status_cancel.html",
          //   "utf-8"
          // );

          const parentDir = path.resolve(__dirname, "..", "..");
          const exactFile = path.join(
            parentDir,
            "templates",
            "transaction_status_cancel.html"
          );

          const rawHTML = fs.readFileSync(exactFile, "utf-8");

          const compiledHTML = handlebars.compile(rawHTML);

          const htmlResult = compiledHTML({
            username: findUserWhoShop.username,
            transactionId: req.params.id,
            transactionDate: findTransaction.createdAt
              .toISOString()
              .split("T")[0],
            transactionStatus: transaction_status,
            noteForCustomer: "-",
          });

          await emailer({
            to: findUserWhoShop.email,
            html: htmlResult,
            subject: "Transaction Status",
            text: "User Transaction Status",
          });

          return res.status(200).json({
            message: `transaction status updated to ${transaction_status}`,
          });
        }

        const formatRupiah = (value) => {
          return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(value);
        };

        // const rawHTML = fs.readFileSync(
        //   "templates/transaction_status_cancel.html",
        //   "utf-8"
        // );

        const parentDir = path.resolve(__dirname, "..", "..");
        const exactFile = path.join(
          parentDir,
          "templates",
          "transaction_status_cancel.html"
        );

        const rawHTML = fs.readFileSync(exactFile, "utf-8");

        const compiledHTML = handlebars.compile(rawHTML);

        const htmlResult = compiledHTML({
          username: findUserWhoShop.username,
          transactionId: req.params.id,
          transactionDate: findTransaction.createdAt
            .toISOString()
            .split("T")[0],
          transactionStatus: transaction_status,
          noteForCustomer: note_to_customer,
          refund: `Due to cancelled transaction, we ensure you to do refund by the amount of ${formatRupiah(
            findTransaction.total_price
          )} (based on transaction total price) to your account number.`,
        });

        await emailer({
          to: findUserWhoShop.email,
          html: htmlResult,
          subject: "Transaction Status",
          text: "User Transaction Status",
        });

        return res.status(200).json({
          message: `transaction status updated to ${transaction_status}`,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  getAvailableTransaction: async (req, res) => {
    try {
      const findAdmin = await db.Branch.findOne({
        where: {
          UserId: req.user.id,
        },
      });

      const findTransactionById = await db.Transaction.findAndCountAll({
        where: {
          BranchId: findAdmin.id,
          transaction_status: {
            [Op.in]: [
              "Waiting For Approval",
              "Waiting For Payment",
              "Payment Approved",
              "Product In Shipment",
            ],
          },
        },
      });

      return res.status(200).json({
        message: "get available transaction",
        data: findTransactionById.rows,
        dataCount: findTransactionById.count,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  getProductToSend: async (req, res) => {
    try {
      const findAdmin = await db.Branch.findOne({
        where: {
          UserId: req.user.id,
        },
      });

      const findPaymentApprovedTransaction = await db.Transaction.findAll({
        where: {
          BranchId: findAdmin.id,
          transaction_status: "Payment Approved",
        },
      });

      const parseFindApprovedPayment = JSON.parse(
        JSON.stringify(findPaymentApprovedTransaction)
      );

      let totalProductToSend = 0;

      for (let i = 0; i < parseFindApprovedPayment.length; i++) {
        totalProductToSend =
          totalProductToSend + parseFindApprovedPayment[i].total_quantity;
      }

      return res.status(200).json({
        message: "get product to send",
        data: totalProductToSend,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
};

module.exports = adminTransactionController;
