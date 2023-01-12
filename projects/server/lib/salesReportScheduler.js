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
      },
    });
    if (getTodayTransaction.length === 0) {
      const findAllBranch = await db.Branch.findAll();
      const findBranchId = findAllBranch.map((val) => {
        return {
          today: moment(new Date().setHours(0, 0, 0, 0)),
          BranchId: val.id,
          today_gross_income: 0,
        };
      });
      await db.SalesReport.bulkCreate(findBranchId);
    }
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
    await db.SalesReport.bulkCreate(values);
  }
);

module.exports = salesReportScheduler;
