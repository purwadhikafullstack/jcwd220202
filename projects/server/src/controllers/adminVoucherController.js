const db = require("../../models");
const { Op } = require("sequelize");
const moment = require("moment");

const adminVoucherController = {
  createDiscountVoucher: async (req, res) => {
    try {
      const {
        discount_amount_nominal,
        discount_amount_percentage,
        products,
        minimum_payment,
        voucher_start_date,
        voucher_end_date,
        quantity,
        voucher_name,
      } = req.body;

      const findAdmin = await db.Branch.findOne({
        where: {
          UserId: req.user.id,
        },
      });

      const findVoucherName = await db.Voucher.findOne({
        where: {
          voucher_name: voucher_name,
        },
      });

      if (findVoucherName) {
        return res.status(400).json({
          message: "voucher name already exist",
        });
      }
      if (discount_amount_nominal == 0 && discount_amount_percentage == 0) {
        return res.status(400).json({
          message: "admin must fill at least one type of discount",
        });
      }

      if (discount_amount_nominal > 0 && discount_amount_percentage > 0) {
        return res.status(400).json({
          message: "admin can only choose one type of discount",
        });
      }

      const startUnixDate = moment(voucher_start_date).unix();
      const endUnixDate = moment(voucher_end_date).unix();
      const nowUnixDate = moment(new Date()).unix();

      if (nowUnixDate > startUnixDate) {
        return res.status(400).json({
          message: "we cant go back to the past",
        });
      }

      if (endUnixDate < startUnixDate) {
        return res.status(400).json({
          message: "end date can't be lower than start date",
        });
      }

      const makeVoucher = products.map((val) => {
        return {
          voucher_name: voucher_name,
          VoucherTypeId: 1,
          BranchId: findAdmin.id,
          discount_amount_nominal: discount_amount_nominal,
          discount_amount_percentage: discount_amount_percentage,
          ProductId: val.ProductId,
          minimum_payment: minimum_payment,
          voucher_start_date: moment(voucher_start_date).format("YYYY-MM-DD"),
          voucher_end_date: moment(voucher_end_date).format("YYYY-MM-DD"),
          quantity: quantity,
        };
      });

      const voucherResult = await db.Voucher.bulkCreate(makeVoucher);

      return res.status(200).json({
        message: "discount voucher created",
        data: voucherResult,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  createFreeShipmentVoucher: async (req, res) => {
    try {
      const {
        discount_amount_nominal,
        discount_amount_percentage,
        minimum_transaction_done,
        voucher_start_date,
        voucher_end_date,
        quantity,
        voucher_name,
      } = req.body;

      const findAdmin = await db.Branch.findOne({
        where: {
          UserId: req.user.id,
        },
      });

      const findVoucherName = await db.Voucher.findOne({
        where: {
          voucher_name: voucher_name,
        },
      });

      if (findVoucherName) {
        return res.status(400).json({
          message: "voucher name already exist",
        });
      }

      if (discount_amount_nominal == 0 && discount_amount_percentage == 0) {
        return res.status(400).json({
          message: "admin must fill at least one type of discount",
        });
      }

      if (discount_amount_nominal > 0 && discount_amount_percentage > 0) {
        return res.status(400).json({
          message: "admin can only choose one type of discount",
        });
      }

      const startUnixDate = moment(voucher_start_date).unix();
      const endUnixDate = moment(voucher_end_date).unix();
      const nowUnixDate = moment(new Date()).unix();

      if (nowUnixDate > startUnixDate) {
        return res.status(400).json({
          message: "we cant go back to the past",
        });
      }

      if (endUnixDate < startUnixDate) {
        return res.status(400).json({
          message: "end date can't be lower than start date",
        });
      }

      const voucherResult = await db.Voucher.create({
        VoucherTypeId: 2,
        BranchId: findAdmin.id,
        voucher_name: voucher_name,
        discount_amount_nominal: discount_amount_nominal,
        discount_amount_percentage: discount_amount_percentage,
        minimum_transaction_done: minimum_transaction_done,
        voucher_start_date: moment(voucher_start_date).format("YYYY-MM-DD"),
        voucher_end_date: moment(voucher_end_date).format("YYYY-MM-DD"),
        quantity: quantity,
      });

      return res.status(200).json({
        message: "free shipment voucher created",
        data: voucherResult,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  createBuy1Get1Voucher: async (req, res) => {
    try {
      const {
        products,
        minimum_payment,
        voucher_start_date,
        voucher_end_date,
        quantity,
        voucher_name,
      } = req.body;

      const findAdmin = await db.Branch.findOne({
        where: {
          UserId: req.user.id,
        },
      });

      const findVoucherName = await db.Voucher.findOne({
        where: {
          voucher_name: voucher_name,
        },
      });

      if (findVoucherName) {
        return res.status(400).json({
          message: "voucher name already exist",
        });
      }

      const startUnixDate = moment(voucher_start_date).unix();
      const endUnixDate = moment(voucher_end_date).unix();
      const nowUnixDate = moment(new Date()).unix();

      if (nowUnixDate > startUnixDate) {
        return res.status(400).json({
          message: "we cant go back to the past",
        });
      }

      if (endUnixDate < startUnixDate) {
        return res.status(400).json({
          message: "end date can't be lower than start date",
        });
      }

      const makeVoucher = products.map((val) => {
        return {
          VoucherTypeId: 3,
          BranchId: findAdmin.id,
          voucher_name: voucher_name,
          ProductId: val.ProductId,
          minimum_payment: minimum_payment,
          voucher_start_date: moment(voucher_start_date).format("YYYY-MM-DD"),
          voucher_end_date: moment(voucher_end_date).format("YYYY-MM-DD"),
          quantity: quantity,
        };
      });

      const voucherResult = await db.Voucher.bulkCreate(makeVoucher);

      return res.status(200).json({
        message: "buy 1 get 1 voucher created",
        data: voucherResult,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
};

module.exports = adminVoucherController;
