const schedule = require("node-schedule");
const db = require("../models");
const moment = require("moment");
const { Op } = require("sequelize");

const endVoucherScheduler = schedule.scheduleJob("0 * * * * *", async () => {
  const getVoucher = await db.Voucher.findAll({
    where: {
      [Op.or]: [
        {
          voucher_end_date: moment(),
        },
        {
          voucher_end_date: {
            [Op.lt]: moment(),
          },
        },
      ],
    },
  });

  const ids = getVoucher.map((val) => val.id);

  await db.Voucher.update(
    {
      is_Active: 0,
    },
    {
      where: {
        id: ids,
      },
    }
  );
});

module.exports = endVoucherScheduler;
