import { Controller, Get, Inject } from "@nestjs/common";
import { GameService, ReadGamesService } from "src/core/game/game.service";

@Controller("game-history")
export class GameHistoryController {
     constructor(@Inject(GameService) private gameService: ReadGamesService) {}

     @Get("/")
     getAllFinishedGames() {
          return this.gameService.getAllFinishedGames();
     }
}
