// SQL queries to create the database and tables if they don't exist
const createDatabaseQuery = `
  CREATE DATABASE IF NOT EXISTS secret_santa;
`;

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS secret_santa_pairs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    giver VARCHAR(255) NOT NULL,
    receiver VARCHAR(255),
    groupId CHAR(36) NOT NULL,
    UNIQUE KEY(giver, groupId)
  );
`;

export { createDatabaseQuery, createTableQuery };
