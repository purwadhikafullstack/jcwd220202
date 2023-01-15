const { Op } = require("sequelize");
const db = require("../../models");
const checkPayment = require("../../lib/schedulePayment");
const moment = require("moment");

const transactionController = {
  addToCart: async (req, res) => {
    const { ProductBranchId, quantity, total_product_price, current_price } =
      req.body;

    try {
      const conditionDouble = await db.Cart.findOne({
        where: {
          [Op.and]: [
            { is_checked: 0 },
            { ProductBranchId: req.body.ProductBranchId },
            { UserId: req.user.id },
          ],
        },
      });
      if (conditionDouble) {
        // await db.Cart.increment(
        //   { quantity: +1 },
        //   {
        //     where: {
        //       where: {
        //         [Op.and]: [
        //           { ProductBranchId: req.body.ProductBranchId },
        //           { UserId: req.user.id },
        //         ],
        //       },
        //     },
        //   }
        // );
        return res.status(400).json({
          message: "Product already added",
        });
      } else {
        const addProduct = await db.Cart.create({
          UserId: req.user.id,
          ProductBranchId,
          quantity,
          current_price: current_price,
          total_product_price: current_price,
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
    try {
      const userCart = await db.Cart.findAll({
        where: {
          [Op.and]: [{ is_checked: 0 }, { UserId: req.user.id }],
        },
        include: [
          { model: db.ProductBranch, include: [{ model: db.Product }] },
        ],
      });

      // let totalHarga = 0;

      // for (let i = 0; i < userCart.length; i++) {
      //   totalHarga += userCart[i].total_product_price;
      // }

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
      // const pusatPrice = await db.Product.findAll();
      const currentCart = await db.Cart.findAll({
        where: {
          [Op.and]: [{ is_checked: 0 }, { UserId: req.user.id }],
        },
        include: [
          {
            model: db.ProductBranch,
            include: [{ model: db.Product }],
          },
        ],
      });
      let totalBayar = 0;
      let totalQuantity = 0;

      for (let i = 0; i < currentCart.length; i++) {
        totalBayar += currentCart[i].total_product_price;
        totalQuantity += currentCart[i].quantity;
      }

      const thisTransactionId = await db.Transaction.create({
        BranchId: currentCart[0].ProductBranch.BranchId,
        total_quantity: totalQuantity,
        total_price: totalBayar,
        UserId: req.user.id,
      });
      const createTransactionItem = currentCart.map((val) => {
        return {
          TransactionId: thisTransactionId.id,
          ProductBranchId: val.ProductBranchId,
          quantity: val.quantity,
          current_price: val.current_price,
          price_per_product: val.current_price * val.quantity,
          applied_discount:
            val.ProductBranch.Product.product_price - val.current_price,
        };
      });
      await db.TransactionItem.bulkCreate(createTransactionItem);

      await db.Cart.destroy({
        where: { UserId: req.user.id },
      });

      return res.status(200).json({
        message: "Product checked out",
        data: thisTransactionId,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error handling cart",
      });
    }
  },
  updateQuantity: async (req, res) => {
    try {
      const currentPrice = await db.Cart.findOne({
        where: {
          [Op.and]: [
            // { is_checked: false },
            { UserId: req.user.id },
            { ProductBranchId: req.body.ProductBranchId },
          ],
        },
      });
      console.log(JSON.parse(JSON.stringify(currentPrice)));
      await db.Cart.update(
        {
          quantity: req.body.qty,
          total_product_price: req.body.qty * currentPrice.current_price,
        },
        {
          where: {
            [Op.and]: [
              { is_checked: false },
              { UserId: req.user.id },
              { ProductBranchId: req.body.ProductBranchId },
            ],
          },
        }
      );

      return res.status(200).json({
        message: "Product added",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Failed to add product",
      });
    }
  },
  deleteItem: async (req, res) => {
    try {
      await db.Cart.destroy({
        where: { id: req.params.id },
      });

      return res.status(200).json({
        message: "Product deleted",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Failed to delete product",
      });
    }
  },
  updatePayment: async (req, res) => {
    try {
      const get = await db.Transaction.findOne({
        where: {
          id: req.params.id,
        },
      });

      const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
      const expDate = moment(get.expired_date).format("YYYY-MM-DD HH:mm:ss");

      if (currentDate > expDate) {
        return res.status(200).json({
          message: "Payment expired",
        });
      }

      await db.Transaction.update(
        {
          payment_proof_img: req.file.filename,
          transaction_status: "Waiting For Approval",
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
      });

      const expDate = moment(get.expired_date).format("LLL");
      const price = get.total_price;
      const status = get.transaction_status;

      return res.status(200).json({
        message: "Get successful",
        price,
        expDate,
        status,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.message,
      });
    }
  },
  orderItems: async (req, res) => {
    try {
      const thisCart = await db.TransactionItem.findAll({
        where: {
          TransactionId: req.params.id,
        },
        include: [
          { model: db.ProductBranch, include: [{ model: db.Product }] },
        ],
      });
      // const thisCart = await db.Cart.findAll({
      //   where: {
      //     [Op.and]: [{ is_checked: 0 }, { UserId: req.user.id }],
      //   },
      //   include: [
      //     { model: db.ProductBranch, include: [{ model: db.Product }] },
      //   ],
      // });
      return res.status(200).json({
        message: "Showing user cart",
        data: thisCart,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  payOrder: async (req, res) => {
    try {
      const currentCart = await db.Cart.findAll({
        where: {
          [Op.and]: [{ is_checked: 0 }, { UserId: req.user.id }],
        },
        include: [{ model: db.ProductBranch }],
      });
      // console.log(JSON.parse(JSON.stringify(currentCart)));

      let totalBayar = 0;
      let totalQuantity = 0;

      for (let i = 0; i < currentCart.length; i++) {
        totalBayar += currentCart[i].total_product_price;
        totalQuantity += currentCart[i].quantity;
      }

      // const thisTransactionId = await db.Transaction.findAll({
      //   where: {
      //     [Op.and]: [
      //       { UserId: req.user.id },
      //       // { BranchId: currentCart.BranchId },
      //       { transaction_status: "Waiting For Payment" },
      //     ],
      //   },
      // });

      // currentCart.map(async (val) => {
      //   await db.TransactionItem.create({
      //     TransactionId: thisTransactionId.id,
      //     ProductBranchId: val.ProductBranchId,
      //     quantity: val.quantity,
      //     current_price: val.current_price,
      //     price_per_product: val.total_product_price,
      //     applied_discount: val.applied_discount,
      //   });
      // });

      await db.Transaction.update(
        {
          transaction_status: "Waiting For Payment",
          shipping_method: "isi",
        },
        {
          where: {
            [Op.and]: [
              { UserId: req.user.id },
              // { BranchId: currentCart.BranchId },
            ],
          },
        }
      );

      // kaka, ini bentuk create yang aku butuh biar schedule aku bisa jalan, klo ini bisa aku udah ga butuh controller createPayment
      // nanti coba aja buat const expDate = moment().add(30, "seconds").format("YYYY-MM-DD HH:mm:ss");
      // trus pas kita pencet pay me di FE dia harusnya udah jalan otomatis ko schedule nya

      // klo code aku dipake, berarti update yg atas udah gaperlu dipake

      // =========== dari sini

      // const expDate = moment().add(2, "hours").format("YYYY-MM-DD HH:mm:ss");

      // const transaction = await db.Transaction.update(
      //   {
      //     transaction_status: "Waiting For Payment",
      //     expired_date: expDate,
      //   },
      //   {
      //     where: {
      //       [Op.and]: [
      //         { UserId: req.user.id },
      //         { BranchId: currentCart.BranchId },
      //         { transaction_status: "waiting" },
      //       ],
      //     },
      //   }
      // );

      //   checkPayment(transaction)

      // ========= sampe sini

      return res.status(200).json({
        message: "Product paid out",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error handling order",
      });
    }
  },
  shipmentCourse: async (req, res) => {
    try {
      const currentBranchId = await db.Transaction.findOne({
        where: { UserId: req.user.id },
        include: [{ model: db.Branch, include: [{ model: db.User }] }],
      });
      // alamat buyer
      const origin = await db.Address.findOne({
        where: { [Op.and]: [{ UserId: req.user.id }, { is_active: 1 }] },
      });
      // alamat seller
      const destination = await db.Address.findOne({
        where: {
          [Op.and]: [
            { UserId: currentBranchId.Branch.User.id },
            { is_active: 1 },
          ],
        },
      });

      // const destination = db.Address.findOne()

      return res.status(200).json({
        origin: origin,
        destination: destination,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getAllVoucher: async (req, res) => {
    try {
      const currentItems = await db.TransactionItem.findAll({
        where: {
          TransactionId: req.params.id,
        },
        include: [{ model: db.ProductBranch }],
      });

      const thisProductId = currentItems.map((val) => {
        return val.ProductBranch.ProductId;
      });

      const getVoucher = await db.Voucher.findAll({
        where: {
          [Op.and]: [
            { BranchId: currentItems[0].ProductBranch.BranchId },
            { ProductId: thisProductId },

            { quantity: { [Op.gt]: 0 } },
          ],
        },
      });

      console.log(JSON.parse(JSON.stringify(getVoucher)));
      return res.status(200).json({
        message: "Fetching all voucher available",
        data: getVoucher,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server can't find voucher",
      });
    }
  },
  useVoucher: async (req, res) => {
    const { finalBanget, VoucherId, shipping_method, shipment_price } =
      req.body;
    try {
      const currentUser = await db.User.findOne({
        where: { id: req.user.id },
        include: { model: db.Address, where: { is_active: true } },
      });
      // const thisTransaction = await db.Transaction.findByPk(req.params.id);
      const voucherValue = await db.Voucher.findByPk(VoucherId);
      const expDate = moment().add(2, "hours").format("YYYY-MM-DD HH:mm:ss");
      // console.log(JSON.parse(JSON.stringify(currentUser.Addresses[0].address)));
      await db.Transaction.update(
        {
          total_price: finalBanget,
          VoucherId: VoucherId,
          transaction_status: "Waiting For Payment",
          shipping_method: shipping_method,
          shipment_price: shipment_price,
          shipping_address: currentUser.Addresses[0].address,
          expired_date: expDate,
        },
        { where: { id: req.params.id } }
      );
      if (VoucherId) {
        await db.Voucher.update(
          {
            quantity: voucherValue.quantity - 1,
          },
          { where: { id: VoucherId } }
        );
      }

      // if (thisTransaction.VoucherId) {
      //   return res.status(400)
      // }
      // if (voucherValue.VoucherTypeId == 1) {
      //   await db.Transaction.update(
      //     {
      //       total_price:
      //         thisTransaction.total_price -
      //         voucherValue.discount_amount_nominal,
      //       VoucherId: voucherValue.id
      //     },
      //     { where: { id: req.params.id } }
      //   );
      //
      // }
      // console.log(voucherValue.discount_amount_nominal);
      // console.log(thisTransaction.total_price);
      return res.status(200).json({
        message: "paid",
      });
    } catch (err) {
      console.log(err);
    }
  },
  createPayment: async (req, res) => {
    try {
      const expDate = moment().add(2, "hours").format("YYYY-MM-DD HH:mm:ss");

      const transaction = await db.Transaction.create({
        ...req.body,
        expired_date: expDate,
        transaction_status: "waiting for payment",
      });

      checkPayment(transaction);

      return res.status(200).json({
        message: "create transaction",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  allUserTransactions: async (req, res) => {
    try {
      return res.status(200).json({
        message: "Showing all user transactions",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  getAllTransactionUser: async (req, res) => {
    try {
      const {
        username = "",
        transaction_status = "",
        _sortBy = "createdAt",
        _sortDir = "DESC",
        _limit = 12,
        _page = 1,
      } = req.query;

      if (_sortBy === "createdAt" || username || transaction_status) {
        if (!transaction_status) {
          const findAllTransaction = await db.Transaction.findAndCountAll({
            limit: Number(_limit),
            offset: (_page - 1) * _limit,
            where: {
              UserId: req.user.id,
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
            UserId: req.user.id,
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
          UserId: req.user.id,
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
  userTransactionById: async (req, res) => {
    try {
      const findTransaction = await db.Transaction.findOne({
        where: {
          id: req.params.id,
        },
      });
      console.log(findTransaction);
      const findTransactionById = await db.Transaction.findOne({
        where: {
          id: req.params.id,
          BranchId: findTransaction.BranchId,
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
  orderAccepted: async (req, res) => {
    try {
      const thisTransaction = await db.TransactionItem.findAll({
        where: {
          TransactionId: req.params.id,
        },
        include: [{ model: db.ProductBranch }],
      });
      const createTransactionHistory = thisTransaction.map((val) => {
        return {
          BranchId: thisTransaction[0].ProductBranch.BranchId,
          ProductId: val.ProductBranch.ProductId,
          initial_stock: val.ProductBranch.stock,
          current_stock: val.ProductBranch.stock - val.quantity,
          stock_movement: val.quantity,
          remarks: "Market Activity",
          TransactionItemId: val.id,
        };
      });
      await db.ProductHistory.bulkCreate(createTransactionHistory);
      await db.Transaction.update(
        { transaction_status: "Success" },
        {
          where: { [Op.and]: [{ UserId: req.user.id }, { id: req.params.id }] },
        }
      );
      // await db.ProductBranch.bulkCreate(createTransactionHistory, {
      //   updateOnDuplicate: ["stock", "current_stock"],
      // });

      return res.status(200).json({
        message: "product history created",
        data: createTransactionHistory,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
};

module.exports = transactionController;
