const schedule = require("node-schedule");
const db = require("../models");
const moment = require("moment");
const { Op } = require("sequelize");

const job = schedule.scheduleJob("0 * * * * *", async () => {
  const getTransaction = await db.Transaction.findAll({
    where: {
      expired_date: {
        [Op.lt]: moment(),
      },
      transaction_status: "Waiting For Payment",
    },
  });

  const ids = getTransaction.map((item) => item.id);

  await db.Transaction.update(
    {
      transaction_status: "Cancel",
    },
    {
      where: {
        id: ids,
      },
    }
  );
});

module.exports = job;
