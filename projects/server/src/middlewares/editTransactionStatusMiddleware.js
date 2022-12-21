const { check, validationResult } = require("express-validator");

exports.editTransactionStatusMiddleware = [
  check("transaction_status")
    .isString()
    .withMessage("Invalid transaction status")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Invalid transaction status")
    .bail(),
  check("note_to_customer").isString().withMessage("Invalid note to customer"),
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
