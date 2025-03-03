import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  imports:[UserModule, JwtModule.registerAsync({imports:[ConfigModule],useExisting:ConfigService})]
})
export class AuthenticationModule {}
