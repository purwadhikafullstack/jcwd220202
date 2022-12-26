const schedule = require("node-schedule");
const db = require("../models");
const moment = require("moment");
const { Op } = require("sequelize");

const salesReportScheduler = schedule.scheduleJob(
  "50 59 23 * * *",
  async () => {
    const today_start = moment(new Date().setHours(0, 0, 0, 0));
    const now = moment(new Date().setHours(23, 59, 40));

    const getTodayTransaction = await db.Transaction.findAll({
      where: {
        createdAt: {
          [Op.between]: [today_start, now],
        },
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

    // console.log(values);

    await db.SalesReport.bulkCreate(values);
  }
);

module.exports = salesReportScheduler;
