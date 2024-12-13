import mysql from "mysql2"; // No need for Connection type import
import { createDatabaseQuery, createTableQuery } from "./queries";

// Function to initialize the database and tables
export function initializeDatabase(): void {
  // Create connection with mysql2
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root", // Update as necessary
    password: "", // Update as necessary
  });

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      return;
    }

    console.log("Connected to the MySQL server.");

    // Step 1: Create the database if it doesn't exist
    connection.query(createDatabaseQuery, (err, result) => {
      if (err) {
        console.error("Error creating database:", err);
        connection.end();
        return;
      }
      console.log("Database created or already exists.");

      // Step 2: Switch to the 'secret_santa' database
      connection.changeUser({ database: "secret_santa" }, (err) => {
        if (err) {
          console.error("Error selecting database:", err);
          connection.end();
          return;
        }

        // Step 3: Create the table if it doesn't exist
        connection.query(createTableQuery, (err, result) => {
          if (err) {
            console.error("Error creating table:", err);
            connection.end();
            return;
          }
          console.log("Table created or already exists.");
          connection.end();
        });
      });
    });
  });
}
