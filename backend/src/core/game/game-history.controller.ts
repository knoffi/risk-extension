import { Controller, Get, Inject } from "@nestjs/common";
import { GetHistoryResponse } from "@shared/src/core/game/dto";
import { GameService, ReadGamesService } from "src/core/game/game.service";
import { Public } from "src/supporting/authentication/public.decorator";

@Controller("game-history")
export class GameHistoryController {
     constructor(@Inject(GameService) private gameService: ReadGamesService) {}

     @Public()
     @Get("/")
     getAllFinishedGames(): Promise<GetHistoryResponse> {
          return this.gameService
               .getAllFinishedGames()
               .then((games) => ({ games }));
     }
}
