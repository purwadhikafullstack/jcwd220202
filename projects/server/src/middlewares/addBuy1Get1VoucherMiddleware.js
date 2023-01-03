const { check, validationResult } = require("express-validator");

exports.validateBuy1Get1Voucher = [
  check("voucher_name")
    .isString()
    .withMessage("Invalid voucher name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Invalid voucher name")
    .bail(),
  check("minimum_payment")
    .isFloat({ min: 0 })
    .withMessage("Invalid minimum payment")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Invalid minimum payment")
    .bail(),
  check("voucher_start_date")
    .isString()
    .withMessage("Invalid start date")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Invalid start date")
    .bail(),
  check("products").not().isEmpty().withMessage("Invalid products"),
  check("voucher_end_date")
    .isString()
    .withMessage("Invalid end date")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Invalid category")
    .bail(),
  check("quantity")
    .isFloat({ min: 1 })
    .withMessage("Invalid minimum payment")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Invalid minimum payment")
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
