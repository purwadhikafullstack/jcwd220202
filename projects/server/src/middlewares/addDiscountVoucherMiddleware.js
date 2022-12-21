const { check, validationResult } = require("express-validator");

exports.validateAddDiscountVoucher = [
  check("voucher_name")
    .isString()
    .withMessage("Invalid voucher name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Invalid voucher name")
    .bail(),
  check("products").not().isEmpty().withMessage("Invalid discount products"),
  check("discount_amount_nominal")
    .isFloat({ min: 0 })
    .withMessage("Invalid discount nominal")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Invalid discount nominal")
    .bail(),
  check("discount_amount_percentage")
    .isFloat({ min: 0, max: 99 })
    .withMessage("Invalid discount nominal")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Invalid discount nominal")
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
    .withMessage("Invalid category")
    .bail(),
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
