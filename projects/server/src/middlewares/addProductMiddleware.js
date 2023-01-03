const { check, validationResult } = require("express-validator");

exports.validateAddProduct = [
  check("product_image").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Image is required");
    }

    return true;
  }),
  check("product_name")
    .isString()
    .withMessage("Invalid product name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Invalid product name")
    .bail(),
  check("product_price")
    .isNumeric()
    .withMessage("Invalid product price")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Invalid product price")
    .bail(),
  check("product_description")
    .isString()
    .withMessage("Invalid product description")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Invalid product description")
    .bail(),
  check("CategoryId")
    .isNumeric()
    .withMessage("Invalid category")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Invalid category")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({
        errors: errors.array(),
        message: "invalid fields",
      });
    next();
  },
];
