import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { GameModule } from "src/core/game/game.module";
import { AppController } from "./app.controller";
import { GameRoomModule } from "./core/game-room/game-room.module";
import { AuthenticationModule } from "./supporting/authentication/authentication.module";
import { MonitoringModule } from "./supporting/monitoring/monitoring.module";

@Module({
     imports: [
          ServeStaticModule.forRoot({
               rootPath: join(__dirname, "..", "build"),
               exclude: ["/api/{*test}"],
               serveStaticOptions: {
                    fallthrough: false,
               },
          }),
          TypeOrmModule.forRoot({
               type: "postgres",
               host: "db",
               port: 5432,
               // TODO: Find a good way for production
               username: "postgres",
               password: "postgres",
               database: "postgres",
               entities: [],
               synchronize: false,
               autoLoadEntities: true,
          }),
          MonitoringModule,
          GameRoomModule,
          AuthenticationModule,
          GameModule,
     ],
     controllers: [AppController],
})
export class AppModule {}
