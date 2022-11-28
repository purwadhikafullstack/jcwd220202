const { check, validationResult } = require("express-validator");

exports.validateUser = [
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Invalid email address")
    .bail(),
  check("password")
    .isStrongPassword({
      minLength: 8,
      minNumbers: 1,
      minUppercase: 1,
      minSymbols: 1,
      minLowercase: 1,
    })
    .withMessage("Invalid password Input")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Invalid password Input")
    .bail(),
  check("phone_number")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Invalid phone number input")
    .bail()
    .isLength({ min: 10, max: 14 })
    .withMessage("Invalid phone number input")
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
