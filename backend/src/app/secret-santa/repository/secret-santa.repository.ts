import { Injectable } from "@nestjs/common";

import { MySQLConnectionService } from "../db/mysql-connection.service";
import {
  INSERT_SECRET_SANTA_PAIR,
  SELECT_RECEIVER_BY_GROUP_AND_GIVER,
} from "../db/sql/secret-santa.sql";

@Injectable()
export class SecretSantaRepository {
  private names: string[] = []; // In-memory names list

  constructor(
    private readonly mysqlConnectionService: MySQLConnectionService
  ) {}

  private getConnection() {
    return this.mysqlConnectionService.getConnection();
  }

  // Fetch all names (in-memory list)
  async getNames(): Promise<string[]> {
    return this.names;
  }

  // Add a name to the in-memory list
  async addName(name: string): Promise<void> {
    if (this.names.some((n) => n.toLowerCase() === name.toLowerCase())) {
      throw new Error("Name already exists");
    }
    this.names.push(name);
  }

  // Utility to generate a unique groupId
  private generateGroupId(): string {
    return require("uuid").v4();
  }

  // Save a single pair in the database
  async savePair(
    groupId: string,
    giver: string,
    receiver: string
  ): Promise<void> {
    const conn = this.getConnection();

    try {
      conn.execute(INSERT_SECRET_SANTA_PAIR, [groupId, giver, receiver]);
    } catch (err) {
      throw new Error("Failed to save pair");
    }
  }

  // Get the receiver for a given groupId and giver name
  async getReceiver(
    groupId: string,
    firstName: string,
    lastName: string
  ): Promise<{ receiver: string } | null> {
    const conn = this.getConnection();

    const fullName = `${firstName} ${lastName}`;

    const result = await new Promise<any>((resolve, reject) => {
      conn.execute(
        SELECT_RECEIVER_BY_GROUP_AND_GIVER,
        [groupId, firstName, fullName, lastName], // Use the giver field to check these values
        (err, results: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    if (result.length > 0) {
      return { receiver: result[0].receiver };
    }

    return null;
  }
}
