import { Module } from '@nestjs/common';
import { GameRoomGateway } from './game-room.gateway';
import { AuthenticationModule } from 'src/support/authentication/authentication.module';

@Module({
  providers: [GameRoomGateway],
  imports:[AuthenticationModule]
})
export class GameRoomModule {}