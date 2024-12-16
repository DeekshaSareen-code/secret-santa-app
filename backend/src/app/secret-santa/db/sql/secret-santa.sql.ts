export const INSERT_SECRET_SANTA_PAIR = `
  INSERT INTO secret_santa_pairs (groupId, giver, receiver) VALUES (?, ?, ?)
`;

export const SELECT_RECEIVER_BY_GROUP_AND_GIVER = `
    SELECT receiver
    FROM secret_santa_pairs
    WHERE groupId = ?
      AND (LOWER(giver) = LOWER(?) OR LOWER(giver) = LOWER(?) OR LOWER(giver) LIKE LOWER(?))
  `;

export const CREATE_DATABASE_QUERY = `
  CREATE DATABASE IF NOT EXISTS secret_santa;
`;

export const CREATE_TABLE_QUERY = `
  CREATE TABLE IF NOT EXISTS secret_santa_pairs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    giver VARCHAR(255) NOT NULL,
    receiver VARCHAR(255),
    groupId CHAR(36) NOT NULL,
    UNIQUE KEY(giver, groupId)
  );
`;
