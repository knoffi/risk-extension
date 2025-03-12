import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
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
          MonitoringModule,
          GameRoomModule,
          AuthenticationModule,
     ],
     controllers: [AppController],
})
export class AppModule {}
