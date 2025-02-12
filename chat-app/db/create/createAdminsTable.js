const createAdminsTable = () => {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS admins(
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
    );`;

  const insertSQL = `
    INSERT INTO admins(user_id)
    VALUES
      (1);
  `;

  return { createTableSQL, insertSQL };
};

module.exports = createAdminsTable;
