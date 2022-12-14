const { check, validationResult } = require("express-validator");

exports.validateEditProductBranch = [
  check("stock")
    .isNumeric({ min: 0 })
    .withMessage("Invalid stock")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Invalid stock")
    .bail(),
  check("discount_amount_nominal")
    .isNumeric({ min: 0 })
    .withMessage("Invalid discount")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Invalid discount")
    .bail(),
  check("discount_amount_percentage")
    .isNumeric({ min: 0, max: 99 })
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
