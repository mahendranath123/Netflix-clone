const db = require("../db/queries");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

const emptyErr = "must not be empty";
const passwordLengthErr = "must be between 8 & 72 character";
const matchErr = "do not match";
const usernameLengthErr = "must be between 4 to 24 characters";

const validatorUser = [
  body("password")
    .trim()
    .notEmpty()
    .withMessage(`password ${emptyErr}.`)
    .isLength({ min: 8, max: 72 })
    .withMessage(`password ${passwordLengthErr}`),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage(`confirm password ${emptyErr}`)
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage(`passwords ${matchErr}`),
  body("username")
    .trim()
    .notEmpty()
    .withMessage(`username ${emptyErr}`)
    .isLength({ min: 4, max: 24 })
    .withMessage(`username ${usernameLengthErr}`)
    .custom(async (value) => {
      const username = await db.doesUsernameExists(value);
      if (username) throw new Error("username already exists");
    }),
  body("fullname").trim().notEmpty().withMessage(`Fullname ${emptyErr}`),
];

const postSignUp = [
  validatorUser,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.session.signupErrors = errors.array();
      return res.status(400).redirect("sign-up");
    }
    try {
      const { username, fullname, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 17);
      await db.insertUser(username, fullname, hashedPassword);
      res.redirect("/");
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
];

module.exports = postSignUp;
