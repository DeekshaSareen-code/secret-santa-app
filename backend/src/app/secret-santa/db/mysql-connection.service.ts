import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Connection } from "mysql2";
import * as mysql from "mysql2";
import {
  CREATE_DATABASE_QUERY,
  CREATE_TABLE_QUERY,
} from "./sql/secret-santa.sql";

@Injectable()
export class MySQLConnectionService implements OnModuleInit, OnModuleDestroy {
  private connection: Connection;

  constructor() {
    this.initializeConnection();
  }

  private initializeConnection(): void {
    if (!this.connection) {
      this.connection = mysql.createConnection({
        host: "localhost",
        user: "root", // Replace with your MySQL username
        password: "", // Replace with your MySQL password
        database: "secret_santa",
      });

      this.connection.connect((err) => {
        if (err) {
          console.error("Failed to connect to the database:", err.message);
          throw err;
        }
        console.log("Connected to the MySQL database");
      });

      // Ensure database and table exist
      this.ensureDatabaseAndTable();
    }
  }

  private ensureDatabaseAndTable(): void {
    this.connection.query(CREATE_DATABASE_QUERY, (err) => {
      if (err) {
        console.error("Failed to create database:", err.message);
        throw err;
      }
      this.connection.query(CREATE_TABLE_QUERY, (err) => {
        if (err) {
          console.error("Failed to create table:", err.message);
          throw err;
        }
        console.log("Database and table are ready.");
      });
    });
  }

  getConnection(): Connection {
    if (!this.connection) {
      this.initializeConnection();
    }
    return this.connection;
  }

  onModuleInit() {
    this.initializeConnection();
  }

  onModuleDestroy() {
    if (this.connection) {
      this.connection.end((err) => {
        if (err) {
          console.error("Error closing the database connection:", err.message);
        } else {
          console.log("Database connection closed.");
        }
      });
    }
  }
}
