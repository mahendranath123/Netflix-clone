const pool = require("./pool");

async function getAllMessagesWithNameArray() {
  const { rows } = await pool.query(
    "SELECT * FROM users JOIN messages ON messages.user_id = users.id;"
  );
  return rows;
}

async function insertUser(username, fullname, password) {
  const lowerCaseUsername = username.toLowerCase();
  await pool.query(
    `INSERT INTO
    users (username, fullname, password)
    VALUES ($1, $2, $3);`,
    [lowerCaseUsername, fullname, password]
  );
}

async function insertMessage(user_id, title, message_text) {
  await pool.query(
    `INSERT INTO 
      messages (user_id, title, message_text)
      VALUES ($1, $2, $3);`,
    [user_id, title, message_text]
  );
}

async function insertMember(user_id) {
  await pool.query(
    `INSERT INTO
      memberships (user_id)
      VALUES ($1)`,
    [user_id]
  );
}

async function isMember(user_id) {
  const { rows } = await pool.query(
    "select * from memberships where user_id = ($1)",
    [user_id]
  );

  if (rows.length === 0) return false;

  return true;
}

async function doesUsernameExists(username) {
  const { rows } = await pool.query(
    "select username from users where username = $1",
    [username]
  );

  if (rows.length > 0) return true;

  return false;
}

module.exports = {
  getAllMessagesWithNameArray,
  insertUser,
  insertMessage,
  insertMember,
  isMember,
  doesUsernameExists,
};
