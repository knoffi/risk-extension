import { NestFactory } from "@nestjs/core";
import { BACKEND_PORT } from "@shared/src/ports";
import { AppModule } from "src/app.module";

// disable
async function bootstrap() {
     const app = await NestFactory.create(AppModule);
     app.setGlobalPrefix("api");

     app.enableCors({
          origin: ["http://localhost:5173", "http://localhost:4173"],
          methods: "GET,HEAD,PUT,PATCH,POST,DELETE",

          credentials: true, // Allow credentials
          allowedHeaders: "Content-Type,Accept,Authorization",
     });

     await app.listen(BACKEND_PORT);
     console.log(`Application is running on: ${await app.getUrl()}`);
}
void bootstrap();
