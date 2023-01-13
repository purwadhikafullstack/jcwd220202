const schedule = require("node-schedule");
const db = require("../models");
const moment = require("moment");
const { Op } = require("sequelize");

const salesReportScheduler = schedule.scheduleJob(
  "59 59 23 * * *",
  async () => {
    const today_start = moment(new Date().setHours(0, 0, 0, 0));
    const now = moment(new Date().setHours(23, 59, 55));

    const getTodayTransaction = await db.Transaction.findAll({
      where: {
        createdAt: {
          [Op.between]: [today_start, now],
        },
        transaction_status: "Success",
      },
    });

    const allTotalTodayTransaction = getTodayTransaction.map((val) => {
      return {
        BranchId: val.BranchId,
        total_price: val.total_price,
      };
    });

    let hashmap = {};
    for (let i = 0; i < allTotalTodayTransaction.length; i++) {
      let branch = allTotalTodayTransaction[i].BranchId;
      if (!hashmap[branch]) {
        hashmap[branch] = allTotalTodayTransaction[i].total_price;
      } else {
        hashmap[branch] += allTotalTodayTransaction[i].total_price;
      }
    }
    const keys = Object.keys(hashmap);
    const values = keys.map((val) => {
      return {
        today: moment(new Date().setHours(0, 0, 0, 0)),
        BranchId: Number(val),
        today_gross_income: hashmap[val],
      };
    });
    const sales = await db.SalesReport.bulkCreate(values);

    const parseSales = JSON.parse(JSON.stringify(sales));

    const findBranchDoTrans = parseSales.map((val) => {
      return val.BranchId;
    });

    const getTodayNoTransaction = await db.Transaction.findAll({
      where: {
        createdAt: {
          [Op.between]: [today_start, now],
        },
        transaction_status: {
          [Op.not]: "Success",
        },
        BranchId: {
          [Op.not]: findBranchDoTrans,
        },
      },
    });

    const parseGetNoTrans = JSON.parse(JSON.stringify(getTodayNoTransaction));

    const salesNoTransaction = parseGetNoTrans.map((val) => {
      return {
        today: moment(new Date().setHours(0, 0, 0, 0)),
        BranchId: val.BranchId,
        today_gross_income: 0,
      };
    });

    const arrUniq = [
      ...new Map(salesNoTransaction.map((v) => [v.BranchId, v])).values(),
    ];

    await db.SalesReport.bulkCreate(arrUniq);
  }
);

module.exports = salesReportScheduler;
