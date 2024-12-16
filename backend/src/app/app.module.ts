import { Module } from "@nestjs/common";
import { SecretSantaModule } from "./secret-santa/secret-santa.module";

@Module({
  imports: [SecretSantaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
