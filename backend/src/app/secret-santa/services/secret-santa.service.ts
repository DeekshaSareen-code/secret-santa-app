import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { SecretSantaRepository } from "../repository/secret-santa.repository";

@Injectable()
export class SecretSantaService {
  constructor(private readonly repository: SecretSantaRepository) {}

  async createPairs(names: string[]): Promise<{
    groupId: string;
    message: string;
  }> {
    console.log("Creating pairs for:", names);
    if (names.length < 3) {
      throw new Error("At least 3 participants are required");
    }

    // Shuffle names to create random pairs
    const shuffledNames = [...names].sort(() => Math.random() - 0.5);

    const pairs = shuffledNames.map((name, index) => ({
      giver: name,
      receiver: shuffledNames[(index + 1) % shuffledNames.length],
    }));

    // Generate unique group ID
    const groupId = uuidv4();

    // Save each pair to the database
    for (const pair of pairs) {
      await this.repository.savePair(groupId, pair.giver, pair.receiver);
    }

    return { groupId, message: "Pairs created successfully" };
  }

  async getReceiver(
    groupId: string,
    firstName: string,
    lastName: string
  ): Promise<{ receiver: string } | null> {
    return await this.repository.getReceiver(groupId, firstName, lastName);
  }
}
