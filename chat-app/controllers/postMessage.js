const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const emptyErr = "cannot be empty";

const validateMessage = [
  body("messageTitle")
    .notEmpty()
    .withMessage(`Title cannot be empty ${emptyErr}`)
    .isLength({ min: 1, max: 50 })
    .withMessage("message title must be between 1 to 50 character"),
  body("messageText").trim().notEmpty().withMessage(`Message text ${emptyErr}`),
];

const postMessage = [
  validateMessage,
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      const errorArray = error.array();
      //we only have one message to validate which can only be done
      //if modification of client-side by client and req sent
      const errorMessage = errorArray[0];
      //need to pass err object with statusCode & message property
      return res
        .status(400)
        .redirect("error", { statusCode: "400", message: errorMessage });
    }

    const { messageTitle, messageText } = req.body;

    if (res.locals.currentUser) {
      const currentUserId = res.locals.currentUser.id;
      await db.insertMessage(currentUserId, messageTitle, messageText);
      res.redirect("/");
      return;
    }

    //need throw and handle error
    res.redirect("/");
  },
];

module.exports = postMessage;
