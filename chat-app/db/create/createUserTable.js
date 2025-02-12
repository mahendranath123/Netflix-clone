const bcrypt = require("bcrypt");

const createUserTable = async () => {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS users(
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username VARCHAR(255) NOT NULL UNIQUE,
      fullname VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
  );`;

  const hashedPassword = await bcrypt.hash("doNotAuth", 17);

  const insertSQL = `
    INSERT INTO users(username, fullname, password)
    VALUES
      ('username1', 'Dummy User1', '${hashedPassword}'),
      ('username2', 'Dummy User2', '${hashedPassword}'),
      ('username3', 'Dummy User3', '${hashedPassword}');
  `;

  return { createTableSQL, insertSQL };
};

module.exports = createUserTable;
