import { Module } from "@nestjs/common";
import { GameRepository } from "src/core/game/game.repository";
import { GameHistoryController } from "./game-history.controller";
import { GameService } from "./game.service";

@Module({
     providers: [GameService, GameRepository],
     controllers: [GameHistoryController],
})
export class GameModule {}
