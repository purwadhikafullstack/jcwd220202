const schedule = require("node-schedule");
const db = require("../models");

const checkPayment = (objectTransaction) => {
  schedule.scheduleJob(objectTransaction).expired_date,
    async () => {
      const getTransaction = await db.Transaction.findByPk(
        objectTransaction.id
      );

      if (objectTransaction.status === "Waiting For Payment") {
        await db.Transaction.update(
          {
            transaction_status: "Cancel",
          },
          {
            where: {
              id: getTransaction.id,
            },
          }
        );
      }
    };
};

module.exports = checkPayment;
