import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "src/supporting/config/config.module";
import { ConfigService } from "src/supporting/config/config.service";
import { UserModule } from "src/supporting/user/user.module";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";

@Module({
     controllers: [AuthenticationController],
     providers: [AuthenticationService],
     imports: [
          UserModule,
          ConfigModule,
          JwtModule.registerAsync({
               imports: [ConfigModule],
               useExisting: ConfigService,
          }),
     ],
     exports: [AuthenticationService],
})
export class AuthenticationModule {}
