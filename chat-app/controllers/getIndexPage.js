const db = require("../db/queries");
const timesAgo = require("./utils/script");

const getIndexPage = async (req, res) => {
  const messagesArray = await db.getAllMessagesWithNameArray();
  let isUserMember = false;
  const currentUser = res.locals.currentUser;
  const membershipErr = req.session.memberShipError || null;
  req.session.memberShipError = null;

  if (currentUser) {
    const isMember = await db.isMember(currentUser.id);
    if (isMember) isUserMember = true;
  }

  res.render("app", {
    messagesArray: messagesArray,
    isUserMember: isUserMember,
    timesAgo: timesAgo,
    membershipErr: membershipErr,
  });
};

module.exports = getIndexPage;
