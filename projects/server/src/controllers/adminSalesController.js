const db = require("../../models");
const { Op } = require("sequelize");
const moment = require("moment");

const adminSalesController = {
  getAllSalesHistory: async (req, res) => {
    try {
      const {
        branch_name = "",
        _sortBy = "createdAt",
        _sortDir = "ASC",
        _limit = 12,
        _page = 1,
        _startDate = "",
        _endDate = "",
      } = req.query;

      if (_sortBy === "createdAt" || _sortBy === "total_price" || branch_name) {
        if (!_startDate || !_endDate) {
          const findAllTransaction = await db.Transaction.findAndCountAll({
            limit: Number(_limit),
            offset: (_page - 1) * _limit,
            where: {
              transaction_status: "success",
            },
            include: [
              {
                model: db.TransactionItem,
                separate: true,
              },
              {
                model: db.Branch,
                where: {
                  [Op.or]: [
                    {
                      branch_name: {
                        [Op.like]: `%${branch_name}%`,
                      },
                    },
                  ],
                },
              },
              {
                model: db.User,
              },
            ],
            order: [[_sortBy, _sortDir]],
          });

          return res.status(200).json({
            message: "this is transaction list please make it a sales history",
            data: findAllTransaction.rows,
            dataCount: findAllTransaction.count,
          });
        }

        const findAllTransaction = await db.Transaction.findAndCountAll({
          limit: Number(_limit),
          offset: (_page - 1) * _limit,
          where: {
            transaction_status: "success",
            createdAt: {
              [Op.between]: [_startDate, _endDate],
            },
          },
          include: [
            {
              model: db.TransactionItem,
              separate: true,
            },
            {
              model: db.Branch,
              where: {
                [Op.or]: [
                  {
                    branch_name: {
                      [Op.like]: `%${branch_name}%`,
                    },
                  },
                ],
              },
            },
            {
              model: db.User,
            },
          ],
          order: [[_sortBy, _sortDir]],
        });

        return res.status(200).json({
          message: "this is transaction list please make it a sales history",
          data: findAllTransaction.rows,
          dataCount: findAllTransaction.count,
        });
      }

      const findAllTransaction = await db.Transaction.findAndCountAll({
        limit: Number(_limit),
        offset: (_page - 1) * _limit,
        where: {
          transaction_status: "success",
        },
        include: [
          {
            model: db.TransactionItem,
            separate: true,
          },
          {
            model: db.Branch,
            where: {
              [Op.or]: [
                {
                  branch_name: {
                    [Op.like]: `%${branch_name}%`,
                  },
                },
              ],
            },
          },
          {
            model: db.User,
          },
        ],
      });

      return res.status(200).json({
        message: "this is transaction list please make it a sales history",
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
  getSalesHistoryByBranch: async (req, res) => {
    try {
      const {
        username = "",
        _sortBy = "createdAt",
        _sortDir = "ASC",
        _limit = 12,
        _page = 1,
        _startDate = "",
        _endDate = "",
      } = req.query;

      const findAdmin = await db.Branch.findOne({
        where: {
          UserId: req.user.id,
        },
      });

      if (_sortBy === "createdAt" || _sortBy === "total_price" || username) {
        if (!_startDate || !_endDate) {
          const findAllTransaction = await db.Transaction.findAndCountAll({
            limit: Number(_limit),
            offset: (_page - 1) * _limit,
            where: {
              BranchId: findAdmin.id,
              transaction_status: "success",
            },
            include: [
              {
                model: db.TransactionItem,
                separate: true,
              },
              {
                model: db.Branch,
              },
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
            ],
            order: [[_sortBy, _sortDir]],
          });

          return res.status(200).json({
            message: "this is transaction list please make it a sales history",
            data: findAllTransaction.rows,
            dataCount: findAllTransaction.count,
          });
        }

        const findAllTransaction = await db.Transaction.findAndCountAll({
          limit: Number(_limit),
          offset: (_page - 1) * _limit,
          where: {
            BranchId: findAdmin.id,
            transaction_status: "success",
            createdAt: {
              [Op.between]: [_startDate, _endDate],
            },
          },
          include: [
            {
              model: db.TransactionItem,
              separate: true,
            },
            {
              model: db.Branch,
            },
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
          ],
          order: [[_sortBy, _sortDir]],
        });

        return res.status(200).json({
          message: "this is transaction list please make it a sales history",
          data: findAllTransaction.rows,
          dataCount: findAllTransaction.count,
        });
      }

      const findAllTransaction = await db.Transaction.findAndCountAll({
        limit: Number(_limit),
        offset: (_page - 1) * _limit,
        where: {
          BranchId: findAdmin.id,
          transaction_status: "success",
        },
        include: [
          {
            model: db.TransactionItem,
            separate: true,
          },
          {
            model: db.Branch,
          },
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
        ],
      });

      return res.status(200).json({
        message: "this is transaction list please make it a sales history",
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
  getAllGrossIncome: async (req, res) => {
    try {
      const findAllGrossIncome = await db.SalesReport.findAll();

      const parseFindAllGrossIncome = JSON.parse(
        JSON.stringify(findAllGrossIncome)
      );

      let hashmap = {};
      let countHashmap = {};

      for (let i = 0; i < parseFindAllGrossIncome.length; i++) {
        let todayTime = moment(parseFindAllGrossIncome[i].today).format(
          "YYYY-MM-DD"
        );

        if (!hashmap[todayTime]) {
          hashmap[todayTime] = parseFindAllGrossIncome[i].today_gross_income;
        } else {
          hashmap[todayTime] += parseFindAllGrossIncome[i].today_gross_income;
        }

        if (!countHashmap[todayTime]) {
          countHashmap[todayTime] = 1;
        } else {
          countHashmap[todayTime] += 1;
        }
      }

      const keysHashmap = Object.keys(hashmap);
      const valuesHashmap = keysHashmap.map((val) => {
        return hashmap[val];
      });

      const keysCountHashmap = Object.keys(countHashmap);
      const valuesCountHashmap = keysCountHashmap.map((val) => {
        return countHashmap[val];
      });

      const avgGrossIncome = valuesHashmap.map(
        (num, index) => num / valuesCountHashmap[index]
      );

      // console.log(avgGrossIncome);

      return res.status(200).json({
        message: "get avg gross income",
        label: keysHashmap,
        dataSet: avgGrossIncome,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  getAllGrossIncomeByBranch: async (req, res) => {
    try {
      const findAdmin = await db.Branch.findOne({
        where: {
          UserId: req.user.id,
        },
      });

      const findAllGrossIncome = await db.SalesReport.findAll({
        where: {
          BranchId: findAdmin.id,
        },
      });

      const parseFindAllGrossIncome = JSON.parse(
        JSON.stringify(findAllGrossIncome)
      );

      const showDate = parseFindAllGrossIncome.map((val) =>
        moment(val.today).format("YYYY-MM-DD")
      );

      const showData = parseFindAllGrossIncome.map(
        (val) => val.today_gross_income
      );

      return res.status(200).json({
        message: "get gross income by branch",
        label: showDate,
        dataSet: showData,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
};

module.exports = adminSalesController;
