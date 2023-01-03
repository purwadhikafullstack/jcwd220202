const schedule = require("node-schedule");
const db = require("../models");
const moment = require("moment");
const { Op } = require("sequelize");

const startVoucherScheduler = schedule.scheduleJob("0 * * * * *", async () => {
  const getVoucher = await db.Voucher.findAll({
    where: {
      voucher_start_date: moment(),
    },
  });
  const ids = getVoucher.map((val) => val.id);

  await db.Voucher.update(
    {
      is_Active: 1,
    },
    {
      where: {
        id: ids,
      },
    }
  );
});

module.exports = startVoucherScheduler;
