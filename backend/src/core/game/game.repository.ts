import { Injectable } from "@nestjs/common";
import { FinishedGame } from "@shared/src/core/history/dto";

export interface ReadGamesRepo {
     getAllFinishedGames: () => Promise<FinishedGame[]>;
}

type Game = FinishedGame;

@Injectable()
export class GameRepository implements ReadGamesRepo {
     // TODO: Good enough for now, implement real repository
     private inMemoryGames: Game[] = [
          {
               startedAt: new Date("2025-03-02Z14:15:22"),
               endedAt: new Date("2025-03-02Z19:15:22"),
               winningFraction: "Id-of-rev-a",
               winningPlayer: "Id-of-player1",
          },
          {
               startedAt: new Date("2024-11-02Z14:15:22"),
               endedAt: new Date("2024-11-02Z19:15:22"),
               winningFraction: "Id-of-int-v",
               winningPlayer: "Id-of-player2",
          },
     ];

     getAllFinishedGames() {
          return Promise.resolve(this.inMemoryGames);
     }
}
