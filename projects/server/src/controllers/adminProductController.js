const db = require("../../models");
const { Op } = require("sequelize");
const fs = require("fs");

const adminProductController = {
  createProduct: async (req, res) => {
    try {
      const { product_name, product_price, product_description, CategoryId } =
        req.body;

      const findProductName = await db.Product.findOne({
        where: {
          product_name: product_name,
        },
      });

      if (findProductName) {
        return res.status(400).json({
          message: "product name already exist",
        });
      }

      const product_image = `http://localhost:8000/public/${req.file.filename}`;

      const newProduct = await db.Product.create({
        product_name: product_name,
        product_price: Number(product_price),
        product_description: product_description,
        CategoryId: Number(CategoryId),
        product_image: product_image,
      });

      const findAllBranch = await db.Branch.findAll();

      const parseBranch = JSON.parse(JSON.stringify(findAllBranch));

      const findBranchAndProduct = parseBranch.map((val) => {
        return {
          BranchId: val.id,
          ProductId: newProduct.id,
        };
      });

      const createProductToBranch = await db.ProductBranch.bulkCreate(
        findBranchAndProduct
      );

      return res.status(200).json({
        data: newProduct,
        branch: parseBranch,
        productBranch: createProductToBranch,
        message: "product created",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  getAllProductSprAdm: async (req, res) => {
    try {
      const {
        product_name = "",
        product_price = "",
        CategoryId = "",
        _sortBy = "product_name",
        _sortDir = "ASC",
        _limit = 12,
        _page = 1,
      } = req.query;

      if (
        _sortBy === "product_name" ||
        _sortBy === "CategoryId" ||
        _sortBy === "product_price" ||
        product_name ||
        product_price ||
        CategoryId
      ) {
        if (!Number(CategoryId)) {
          const getAllProducts = await db.Product.findAndCountAll({
            paranoid: false,
            limit: Number(_limit),
            offset: (_page - 1) * _limit,
            include: [{ model: db.Category }],
            order: [[_sortBy, _sortDir]],
            where: {
              [Op.or]: [
                {
                  product_name: {
                    [Op.like]: `%${product_name}%`,
                  },
                },
              ],
            },
          });

          return res.status(200).json({
            message: "Get All Products",
            data: getAllProducts.rows,
            dataCount: getAllProducts.count,
          });
        }

        const getAllProducts = await db.Product.findAndCountAll({
          paranoid: false,
          limit: Number(_limit),
          offset: (_page - 1) * _limit,
          include: [{ model: db.Category }],
          order: [[_sortBy, _sortDir]],
          where: {
            [Op.or]: [
              {
                product_name: {
                  [Op.like]: `%${product_name}%`,
                },
              },
            ],
            CategoryId: CategoryId,
          },
        });

        return res.status(200).json({
          message: "Get All Products",
          data: getAllProducts.rows,
          dataCount: getAllProducts.count,
        });
      }

      const getAllProducts = await db.Product.findAndCountAll({
        paranoid: false,
        limit: Number(_limit),
        offset: (_page - 1) * _limit,
        include: [{ model: db.Category }],
      });

      return res.status(200).json({
        message: "Get All Products",
        data: getAllProducts.rows,
        dataCount: getAllProducts.count,
      });
    } catch (error) {
      res.status(500).json({
        message: "server error",
      });
    }
  },
  getAllProductByBranch: async (req, res) => {
    try {
      const {
        product_name = "",
        product_price = "",
        CategoryId = "",
        _sortBy = "product_name",
        _sortDir = "ASC",
        _limit = 12,
        _page = 1,
      } = req.query;

      if (
        _sortBy === "product_name" ||
        _sortBy === "CategoryId" ||
        _sortBy === "product_price" ||
        product_name ||
        product_price ||
        CategoryId
      ) {
        if (!Number(CategoryId)) {
          const findBranchById = await db.Branch.findAndCountAll({
            limit: Number(_limit),
            offset: (_page - 1) * _limit,
            subQuery: false,
            where: {
              UserId: req.user.id,
            },
            attributes: {
              exclude: ["branch_address", "distance", "createdAt", "updatedAt"],
            },
            include: [
              {
                model: db.ProductBranch,
                include: [
                  {
                    model: db.Product,
                    where: {
                      [Op.or]: [
                        {
                          product_name: {
                            [Op.like]: `%${product_name}%`,
                          },
                        },
                      ],
                    },
                    include: [{ model: db.Category }],
                  },
                ],
              },
            ],
            order: [
              [
                { model: db.ProductBranch },
                { model: db.Product },
                _sortBy,
                _sortDir,
              ],
            ],
          });

          return res.status(200).json({
            data: findBranchById.rows,
            dataCount: findBranchById.count,
            message: "get branch data",
          });
        }

        const findBranchById = await db.Branch.findAndCountAll({
          limit: Number(_limit),
          offset: (_page - 1) * _limit,
          subQuery: false,
          where: {
            UserId: req.user.id,
          },
          attributes: {
            exclude: ["branch_address", "distance", "createdAt", "updatedAt"],
          },
          include: [
            {
              model: db.ProductBranch,
              include: [
                {
                  model: db.Product,
                  where: {
                    [Op.or]: [
                      {
                        product_name: {
                          [Op.like]: `%${product_name}%`,
                        },
                      },
                    ],
                    CategoryId: CategoryId,
                  },
                  include: [{ model: db.Category }],
                },
              ],
            },
          ],
          order: [
            [
              { model: db.ProductBranch },
              { model: db.Product },
              _sortBy,
              _sortDir,
            ],
          ],
        });

        return res.status(200).json({
          message: "get branch data",
          data: findBranchById.rows,
          dataCount: findBranchById.count,
        });
      }

      const findBranchById = await db.Branch.findAndCountAlll({
        limit: Number(_limit),
        offset: (_page - 1) * _limit,
        subQuery: false,
        where: {
          UserId: req.user.id,
        },
        attributes: {
          exclude: ["branch_address", "distance", "createdAt", "updatedAt"],
        },
        include: [
          {
            model: db.ProductBranch,
            include: [
              {
                model: db.Product,
                include: [{ model: db.Category }],
              },
            ],
          },
        ],
      });

      return res.status(200).json({
        data: findBranchById.rows,
        dataCount: findBranchById.count,
        message: "get branch data",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  getProductByIdSprAdm: async (req, res) => {
    try {
      const { id } = req.params;

      const findAdmin = await db.User.findByPk(req.user.id);

      if (findAdmin.RoleId !== 3) {
        return res.status(400).json({
          message: "user unauthorized",
        });
      }

      const findProductById = await db.Product.findByPk(id, {
        include: [{ model: db.Category }],
      });

      return res.status(200).json({
        message: "get product by id",
        data: findProductById,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  editProductByIdSprAdm: async (req, res) => {
    try {
      const findAdmin = await db.User.findByPk(req.user.id);

      if (findAdmin.RoleId !== 3) {
        return res.status(400).json({
          message: "user unauthorized",
        });
      }

      if (req.file) {
        req.body.product_image = `http://localhost:8000/public/${req.file.filename}`;
      }

      const findProductByName = await db.Product.findOne({
        where: {
          product_name: req.body.product_name || "",
        },
      });

      if (findProductByName) {
        return res.status(400).json({
          message: "product name has been used",
        });
      }

      if (req.body.product_image) {
        const findProduct = await db.Product.findByPk(req.params.id);

        fs.unlinkSync(`public/${findProduct.product_image.split("/")[4]}`);
      }

      await db.Product.update(
        { ...req.body },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      const findProductById = await db.Product.findByPk(req.params.id);

      return res.status(200).json({
        message: "product data edited",
        data: findProductById,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "server error",
      });
    }
  },
  getProductByIdAdmin: async (req, res) => {
    try {
      const findAdmin = await db.User.findByPk(req.user.id, {
        include: [{ model: db.Branch }],
      });

      if (findAdmin.RoleId !== 2) {
        return res.status(500).json({
          message: "user unauthorized",
        });
      }

      const findProductById = await db.Product.findByPk(req.params.id, {
        include: [
          {
            model: db.Category,
          },
          {
            model: db.ProductBranch,
            where: {
              BranchId: findAdmin.Branch.id,
            },
          },
        ],
      });

      return res.status(200).json({
        message: "get product by id",
        data: findProductById,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  editProductByIdAdmin: async (req, res) => {
    try {
      const { discount_amount_nominal, discount_amount_percentage, stock } =
        req.body;

      if (stock < 0) {
        return res.status(400).json({
          message: "stock can't go under 0",
        });
      }

      const findAdmin = await db.User.findByPk(req.user.id, {
        include: [{ model: db.Branch }],
      });

      if (findAdmin.RoleId !== 2) {
        return res.status(400).json({
          message: "user unauthorized",
        });
      }

      const parseAdmin = JSON.parse(JSON.stringify(findAdmin));

      const findProductWillUpdated = await db.ProductBranch.findOne({
        where: {
          BranchId: parseAdmin.Branch.id,
          ProductId: req.params.id,
        },
      });

      if (stock === findProductWillUpdated.stock) {
        if (discount_amount_percentage === 0) {
          await db.ProductBranch.update(
            {
              discount_amount_nominal: discount_amount_nominal,
              discount_amount_percentage: 0,
              stock: stock,
            },
            {
              where: {
                ProductId: req.params.id,
                BranchId: parseAdmin.Branch.id,
              },
            }
          );
        }

        if (discount_amount_nominal === 0) {
          await db.ProductBranch.update(
            {
              discount_amount_percentage: discount_amount_percentage,
              discount_amount_nominal: 0,
              stock: stock,
            },
            {
              where: {
                ProductId: req.params.id,
                BranchId: parseAdmin.Branch.id,
              },
            }
          );
        }

        return res.status(200).json({
          message: "product updated but not including the history",
        });
      }

      const stock_movement = stock - findProductWillUpdated.stock;

      await db.ProductHistory.create({
        BranchId: parseAdmin.Branch.id,
        ProductId: req.params.id,
        initial_stock: findProductWillUpdated.stock,
        stock_movement: stock_movement,
        remarks: "Warehouse Activity",
      });

      if (discount_amount_nominal > 0 && discount_amount_percentage > 0) {
        return res.status(400).json({
          message: "user just can input one type of discount",
        });
      }

      if (discount_amount_percentage === 0) {
        await db.ProductBranch.update(
          {
            discount_amount_nominal: discount_amount_nominal,
            discount_amount_percentage: 0,
            stock: stock,
          },
          {
            where: {
              ProductId: req.params.id,
              BranchId: parseAdmin.Branch.id,
            },
          }
        );

        const findProductById = await db.Product.findByPk(req.params.id, {
          include: [
            {
              model: db.Category,
            },
            {
              model: db.ProductBranch,
              where: {
                BranchId: parseAdmin.Branch.id,
              },
            },
          ],
        });

        const findHistory = await db.ProductHistory.findAll({
          where: {
            remarks: "Warehouse Activity",
            ProductId: req.params.id,
            BranchId: parseAdmin.Branch.id,
          },
        });

        const parseFindHistory = JSON.parse(JSON.stringify(findHistory));

        const parseFindProductById = JSON.parse(
          JSON.stringify(findProductById)
        );

        await db.ProductHistory.update(
          {
            current_stock: parseFindProductById.ProductBranches[0].stock,
          },
          {
            where: {
              id: parseFindHistory[parseFindHistory.length - 1].id,
            },
          }
        );

        return res.status(200).json({
          message: "discount and stock edited ",
          data: findProductById,
        });
      }

      if (discount_amount_nominal === 0) {
        await db.ProductBranch.update(
          {
            discount_amount_percentage: discount_amount_percentage,
            discount_amount_nominal: 0,
            stock: stock,
          },
          {
            where: {
              ProductId: req.params.id,
              BranchId: parseAdmin.Branch.id,
            },
          }
        );

        const findProductById = await db.Product.findByPk(req.params.id, {
          include: [
            {
              model: db.Category,
            },
            {
              model: db.ProductBranch,
              where: {
                BranchId: parseAdmin.Branch.id,
              },
            },
          ],
        });

        const findHistory = await db.ProductHistory.findAll({
          where: {
            remarks: "Warehouse Activity",
            ProductId: req.params.id,
            BranchId: parseAdmin.Branch.id,
          },
        });

        const parseFindHistory = JSON.parse(JSON.stringify(findHistory));

        const parseFindProductById = JSON.parse(
          JSON.stringify(findProductById)
        );

        await db.ProductHistory.update(
          {
            current_stock: parseFindProductById.ProductBranches[0].stock,
          },
          {
            where: {
              id: parseFindHistory[parseFindHistory.length - 1].id,
            },
          }
        );

        return res.status(200).json({
          message: "discount and stock edited ",
          data: findProductById,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  deleteProductByIdSprAdm: async (req, res) => {
    try {
      const { id } = req.params;

      await db.ProductBranch.update(
        { is_DeletedInBranch: true },
        {
          where: {
            ProductId: id,
          },
        }
      );

      await db.ProductBranch.destroy({
        where: {
          ProductId: id,
        },
      });

      await db.Product.update(
        { is_Deleted: true },
        {
          where: {
            id: id,
          },
        }
      );

      await db.Product.destroy({
        where: {
          id: id,
        },
      });

      return res.status(200).json({
        message: "Product deleted",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  restoreProductById: async (req, res) => {
    try {
      const { id } = req.params;

      await db.ProductBranch.restore({
        where: {
          ProductId: id,
        },
      });

      await db.ProductBranch.update(
        { is_DeletedInBranch: false },
        {
          where: {
            ProductId: id,
          },
        }
      );

      await db.Product.restore({
        where: {
          id: id,
        },
      });

      await db.Product.update(
        { is_Deleted: false },
        {
          where: {
            id: id,
          },
        }
      );

      return res.status(200).json({
        message: "data restored",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  getActiveProduct: async (req, res) => {
    try {
      const findAllActiveProducts = await db.Product.findAndCountAll();

      return res.status(200).json({
        message: "get all active products",
        data: findAllActiveProducts.rows,
        dataCount: findAllActiveProducts.count,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
};

module.exports = adminProductController;
