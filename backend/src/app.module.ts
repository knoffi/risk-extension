import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { GameModule } from "src/core/game/game.module";
import { AuthGuard } from "src/supporting/authentication/auth.guard";
import { ConfigModule } from "src/supporting/config/config.module";
import { ConfigService } from "src/supporting/config/config.service";
import { UserModule } from "src/supporting/user/user.module";
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
          TypeOrmModule.forRootAsync({
               inject: [ConfigService],
               imports: [ConfigModule],
               useFactory: (config: ConfigService) => config.getDBConfig(),
          }),
          UserModule,
          MonitoringModule,
          GameRoomModule,
          AuthenticationModule,
          GameModule,
     ],
     controllers: [AppController],
     providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
