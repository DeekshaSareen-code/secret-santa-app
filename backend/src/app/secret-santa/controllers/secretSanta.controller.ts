import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  Param,
  Query,
} from "@nestjs/common";

import { CreateSecretSantaDto } from "../dtos/secret-santa.dto";
import { SecretSantaService } from "../services/secret-santa.service";
import { SecretSantaRepository } from "../repository/secret-santa.repository";

@Controller("secret-santa")
export class SecretSantaController {
  constructor(
    private readonly secretSantaService: SecretSantaService,
    private readonly secretSantaRepository: SecretSantaRepository
  ) {}

  @Get("/get-names")
  async getNames() {
    return await this.secretSantaRepository.getNames();
  }

  @Post("/add-name")
  async addName(@Body() body: { name: string }) {
    try {
      await this.secretSantaRepository.addName(body.name);
      return { message: "Name added successfully" };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post("/create-pairs")
  async createPairs(@Body() payload: CreateSecretSantaDto) {
    console.log("ehuha", payload.names);
    try {
      return await this.secretSantaService.createPairs(payload.names);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get("/get-receiver/:groupId")
  async getReceiver(
    @Param("groupId") groupId: string,
    @Query("firstName") firstName: string,
    @Query("lastName") lastName: string
  ) {
    try {
      const result = await this.secretSantaService.getReceiver(
        groupId,
        firstName,
        lastName
      );
      if (!result) {
        throw new BadRequestException("No match found");
      }
      return result;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
