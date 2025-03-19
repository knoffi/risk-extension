import { Controller, Get, Inject } from "@nestjs/common";
import { GetHistoryResponse } from "@shared/src/core/game/dto";
import { GameService, ReadGamesService } from "src/core/game/game.service";

@Controller("game-history")
export class GameHistoryController {
     constructor(@Inject(GameService) private gameService: ReadGamesService) {}

     @Get("/")
     getAllFinishedGames(): Promise<GetHistoryResponse> {
          return this.gameService
               .getAllFinishedGames()
               .then((games) => ({ games }));
     }
}
