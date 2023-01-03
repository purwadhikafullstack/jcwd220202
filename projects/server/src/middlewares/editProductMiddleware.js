const { check, validationResult } = require("express-validator");

exports.validateEditProduct = [
  check("product_image").optional({ checkFalsy: true }),
  check("product_name")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("Invalid product name"),
  check("product_price")
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage("Invalid product price"),
  check("product_description")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("Invalid product description"),
  check("CategoryId")
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage("Invalid category"),
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
