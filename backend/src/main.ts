import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";

// disable
async function bootstrap() {
     const app = await NestFactory.create(AppModule);
     app.setGlobalPrefix("api");

     app.enableCors({
          origin: ["http://localhost:5173"],
          methods: "GET,HEAD,PUT,PATCH,POST,DELETE",

          credentials: true, // Allow credentials
          allowedHeaders: "Content-Type,Accept,Authorization",
     });

     await app.listen(3001);
     console.log(`Application is running on: ${await app.getUrl()}`);
}
void bootstrap();
