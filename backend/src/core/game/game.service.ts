import { Inject, Injectable } from "@nestjs/common";
import { FinishedGame } from "@shared/src/core/history/dto";
import { GameRepository, ReadGamesRepo } from "src/core/game/game.repository";

export interface ReadGamesService {
     getAllFinishedGames: () => Promise<FinishedGame[]>;
}
@Injectable()
export class GameService implements ReadGamesService {
     constructor(@Inject(GameRepository) private games: ReadGamesRepo) {}

     getAllFinishedGames() {
          return this.games.getAllFinishedGames();
     }
}
