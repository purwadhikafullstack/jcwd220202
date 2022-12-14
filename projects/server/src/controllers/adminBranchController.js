const db = require("../../models");

const adminBranchController = {
  getAllBranch: async (req, res) => {
    try {
      const findAllBranch = await db.Branch.findAndCountAll();

      return res.status(200).json({
        message: "get all branch",
        data: findAllBranch.rows,
        dataCount: findAllBranch.count,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server Error",
      });
    }
  },
};

module.exports = adminBranchController;
