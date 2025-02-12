const createMembershipsTableSQL = () => {
  const createTableSQL = `
  CREATE TABLE IF NOT EXISTS memberships(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
  );
`;

  const insertSQL = `
    INSERT INTO memberships(user_id)
    VALUES
      (1),
      (2);
  `;

  return { createTableSQL, insertSQL };
};

module.exports = createMembershipsTableSQL;
