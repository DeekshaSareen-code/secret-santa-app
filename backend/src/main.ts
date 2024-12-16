import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with specific configurations
  app.enableCors({
    origin: "http://localhost:4200", // Allow this specific origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true, // Allow cookies if needed
  });

  await app.listen(3000);
  console.log("Application is running on: http://localhost:3000");
}
bootstrap();
