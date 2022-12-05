const db = require("../../models");
const bcrypt = require("bcrypt");

const createAdminController = {
  createAdmin: async (req, res) => {
    try {
      const { email, password, branch_name } = req.body;

      const hashedPassword = bcrypt.hashSync(password, 5);

      const defaultUsername = (email) => {
        const splitEmail = email.split("@");

        return splitEmail[0];
      };

      const newAdmin = await db.User.create({
        email: email,
        password: hashedPassword,
        username: defaultUsername(email),
        RoleId: 2,
      });

      const newBranch = await db.Branch.create({
        UserId: newAdmin.id,
        branch_name: branch_name,
      });

      const findAllProducts = await db.Product.findAll();

      const parseFindAllProducts = JSON.parse(JSON.stringify(findAllProducts));

      const createProductBranch = parseFindAllProducts.map((val) => {
        return {
          ProductId: val.id,
          BranchId: newBranch.id,
        };
      });

      const productBranchRes = await db.ProductBranch.bulkCreate(
        createProductBranch
      );

      return res.status(200).json({
        dataAdmin: newAdmin,
        dataBranch: newBranch,
        dataProductBranch: productBranchRes,
        message: "admin,branch, and product created",
      });
    } catch (error) {
      return res.status(500).json({
        message: "server error",
      });
    }
  },
};

module.exports = createAdminController;
