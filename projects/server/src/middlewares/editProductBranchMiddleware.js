const { check, validationResult } = require("express-validator");

exports.validateEditProductBranch = [
  check("stock")
    .isFloat({ min: 0 })
    .withMessage("Invalid stock")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Invalid stock")
    .bail(),
  check("discount_amount_nominal")
    .isFloat({ min: 0 })
    .withMessage("Invalid discount")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Invalid discount")
    .bail(),
  check("discount_amount_percentage")
    .isFloat({ min: 0, max: 99 })
    .withMessage("Invalid discount")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Invalid discount")
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
