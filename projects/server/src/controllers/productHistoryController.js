const db = require("../../models");
const { Op } = require("sequelize");

const productHistoryController = {
  getProductHistory: async (req, res) => {
    try {
      const {
        product_name = "",
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

      if (_sortBy === "createdAt" || product_name) {
        if (!_startDate || !_endDate) {
          const findAllHistory = await db.ProductHistory.findAndCountAll({
            limit: Number(_limit),
            offset: (_page - 1) * _limit,
            where: {
              BranchId: findAdmin.id,
            },
            include: [
              {
                model: db.Product,
                paranoid: false,
                where: {
                  [Op.or]: [
                    {
                      product_name: {
                        [Op.like]: `%${product_name}%`,
                      },
                    },
                  ],
                },
              },
              {
                model: db.Branch,
              },
            ],
            order: [[_sortBy, _sortDir]],
          });

          return res.status(200).json({
            message: "get all product history",
            data: findAllHistory.rows,
            dataCount: findAllHistory.count,
          });
        }

        const findAllHistory = await db.ProductHistory.findAndCountAll({
          limit: Number(_limit),
          offset: (_page - 1) * _limit,
          where: {
            BranchId: findAdmin.id,
            createdAt: {
              [Op.between]: [_startDate, _endDate],
            },
          },
          include: [
            {
              model: db.Product,
              paranoid: false,
              where: {
                [Op.or]: [
                  {
                    product_name: {
                      [Op.like]: `%${product_name}%`,
                    },
                  },
                ],
              },
            },
            {
              model: db.Branch,
            },
          ],
          order: [[_sortBy, _sortDir]],
        });

        return res.status(200).json({
          message: "get all product history",
          data: findAllHistory.rows,
          dataCount: findAllHistory.count,
        });
      }

      const findAllHistory = await db.ProductHistory.findAndCountAll({
        limit: Number(_limit),
        offset: (_page - 1) * _limit,
        where: {
          BranchId: findAdmin.id,
        },
        include: [{ model: db.Product }, { model: db.Branch }],
      });

      return res.status(200).json({
        message: "get all product history",
        data: findAllHistory.rows,
        dataCount: findAllHistory.count,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
};

module.exports = productHistoryController;
