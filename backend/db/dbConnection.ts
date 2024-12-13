import mysql, { Connection } from "mysql2";

class DatabaseConnection {
  private static instance: DatabaseConnection | null = null;
  private connection: Connection;

  private constructor() {
    this.connection = mysql.createConnection({
      host: "localhost",
      user: "root", // replace with your DB credentials
      password: "", // replace with your DB password
      database: "secret_santa", // replace with your database name
    });
  }

  // Method to get the singleton instance of the connection
  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  // Method to get the connection object
  public getConnection(): Connection {
    return this.connection;
  }
}

// Export the singleton instance for use in other modules
export default DatabaseConnection;
