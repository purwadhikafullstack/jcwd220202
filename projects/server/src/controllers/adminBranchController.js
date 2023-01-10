const db = require("../../models");
const { Op } = require("sequelize");

const adminBranchController = {
    getAllBranch: async (req, res) => {
        try {
            const {
                branch_name = "",
                _sortBy = "branch_name",
                _sortDir = "ASC",
                _limit = 12,
                _page = 1,
            } = req.query;

            if (_sortBy === "branch_name" || branch_name) {
                const findAllBranch = await db.Branch.findAndCountAll({
                    limit: Number(_limit),
                    offset: (_page - 1) * _limit,
                    order: [[_sortBy, _sortDir]],
                    where: {
                        [Op.or]: [
                            {
                                branch_name: {
                                    [Op.like]: `%${branch_name}%`,
                                },
                            },
                        ],
                    },
                    include: [{ model: db.Address }],
                });

                return res.status(200).json({
                    message: "Get All Branch",
                    data: findAllBranch.rows,
                    dataCount: findAllBranch.count,
                });
            }

            const findAllBranch = await db.Branch.findAndCountAll({
                limit: Number(_limit),
                offset: (_page - 1) * _limit,
            });

            console.log(findAllBranch);

            return res.status(200).json({
                message: "Get All Branch",
                data: findAllBranch.rows,
                dataCount: findAllBranch.count,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "server error",
            });
        }
    },
};

module.exports = adminBranchController;
