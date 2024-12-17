import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { SecretSantaRepository } from "../repository/secret-santa.repository";

@Injectable()
export class SecretSantaService {
  constructor(private readonly repository: SecretSantaRepository) {}

  private shuffleArray(array) {
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  }

  async createPairs(names: string[]): Promise<{
    groupId: string;
    message: string;
  }> {
    if (names.length < 3) {
      throw new Error("At least 3 participants are required");
    }

    const shuffledNames = [...names]; // Create a copy of the names array
    // Shuffle names to create random pairs
    this.shuffleArray(shuffledNames);

    // Create the Secret Santa pairs (ensure no one is assigned to themselves)
    const pairs = [];

    for (let i = 0; i < shuffledNames.length; i++) {
      const giver = shuffledNames[i];
      const receiver = shuffledNames[(i + 1) % shuffledNames.length]; // The next person in the shuffled list
      pairs.push({ giver, receiver });
    }

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
