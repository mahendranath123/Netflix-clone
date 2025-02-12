const createMessagesTable = () => {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS messages(
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      title TEXT,
      message_text TEXT,
      timestamp  TIMESTAMPTZ DEFAULT NOW()
    );
`;

  const insertSQL = `
    INSERT INTO messages(user_id, title, message_text, timestamp)
    VALUES
      (1, 'delete it later1', 'This is a fake message1', '2024-01-27 06:12:11 UTC'),
      (2, 'delete it later2', 'This is a fake message2', '2024-01-27 06:07:05 UTC'),
      (1, 'delete it later3', 'This is a fake message3', '2024-01-27 07:37:45 UTC'),
      (3, 'delete it later4', 'This is a fake message4', '2024-01-27 08:13:23 UTC');

  `;

  return { createTableSQL, insertSQL };
};

module.exports = createMessagesTable;
