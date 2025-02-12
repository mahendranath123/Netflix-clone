const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validator = [
  body("membershipAnswer")
    .trim()
    .notEmpty()
    .withMessage("field cannot be empty"),
];

require("dotenv").config();

const postMembership = [
  validator,
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      // returns array of error messages validated above
      const errorArray = error.array();
      //we only have one message to validate which can only be done
      //if modification of client-side by client and req sent
      const errorMessage = errorArray[0];
      //need to pass err object with statusCode & message property
      return res
        .status(400)
        .redirect("error", { statusCode: "400", message: errorMessage });
    }

    const { membershipAnswer } = req.body;

    if (res.locals.currentUser) {
      const currentUserId = res.locals.currentUser.id;

      if (membershipAnswer == process.env.MEMBERSHIPANSWER) {
        const isMember = await db.isMember(Number(currentUserId));
        if (!isMember) await db.insertMember(Number(currentUserId));
      } else {
        req.session.memberShipError = "Enter correct answer";
        return res.status(400).redirect("/");
      }
    }
    res.redirect("/");
  },
];

module.exports = postMembership;
