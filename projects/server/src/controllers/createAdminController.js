const db = require("../../models");
const bcrypt = require("bcrypt");
const axios = require("axios");

const createAdminController = {
  createAdmin: async (req, res) => {
    try {
      const { email, password, cityName, branch_name } = req.body;

      const hashedPassword = bcrypt.hashSync(password, 5);

      const defaultUsername = (email) => {
        const splitEmail = email.split("@");

        return splitEmail[0];
      };

      const location = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?key=deb63d3699474864a43143c467b64441&q=${cityName}`
      );

      const latitude = location.data.results[0].geometry.lat;
      const longitude = location.data.results[0].geometry.lng;

      const newAdmin = await db.User.create({
        email: email,
        password: hashedPassword,
        username: defaultUsername(email),
        RoleId: 2,
      });

      const address = await db.Address.create({
        UserId: newAdmin.id,
        address: cityName,
        latitude: latitude,
        longitude: longitude,
        is_active: 1,
      });

      const newBranch = await db.Branch.create({
        UserId: newAdmin.id,
        branch_name: branch_name,
        AddressId: address.id,
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
        dataAddress: address,
        message: "admin, branch, and product created",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
};

module.exports = createAdminController;
