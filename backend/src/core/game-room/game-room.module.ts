import { Module } from '@nestjs/common';
import { GameRoomGateway } from './game-room.gateway';

@Module({
  providers: [GameRoomGateway],
})
export class GameRoomModule {}