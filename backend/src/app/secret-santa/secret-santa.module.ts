import { Module } from "@nestjs/common";
import { SecretSantaService } from "./services/secret-santa.service";
import { SecretSantaController } from "./controllers/secretSanta.controller";
import { SecretSantaRepository } from "./repository/secret-santa.repository";
import { MySQLConnectionService } from "./db/mysql-connection.service";

@Module({
  controllers: [SecretSantaController], // Register the controller
  providers: [
    SecretSantaService,
    SecretSantaRepository,
    MySQLConnectionService,
  ], // Register the service
  exports: [SecretSantaService], // Export if needed in other modules
})
export class SecretSantaModule {}
