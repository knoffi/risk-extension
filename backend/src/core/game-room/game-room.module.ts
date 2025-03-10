import { Module } from "@nestjs/common";
import { AuthenticationModule } from "src/supporting/authentication/authentication.module";
import { GameRoomGateway } from "./game-room.gateway";

@Module({
  providers: [GameRoomGateway],
  imports: [AuthenticationModule],
})
export class GameRoomModule {}
