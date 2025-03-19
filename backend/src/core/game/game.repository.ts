import { Injectable } from "@nestjs/common";
import { FinishedGame } from "@shared/src/core/game/dto";

export interface ReadGamesRepo {
     getAllFinishedGames: () => Promise<FinishedGame[]>;
}

type Game = FinishedGame;

@Injectable()
export class GameRepository implements ReadGamesRepo {
     // TODO: Good enough for now, implement real repository
     private inMemoryGames: Game[] = [
          {
               startedAt: "2025-03-02T14:15:22Z",
               endedAt: "2025-03-02T19:15:22Z",
               winningFraction: "Id-of-rev-a",
               gameId: "123",
               winningPlayer: "Id-of-player1",
               title: "The will of the people",
          },
          {
               startedAt: "2024-11-02Z12:15:22",
               endedAt: "2024-11-02Z19:15:22",
               winningFraction: "Id-of-int-v",
               gameId: "456",
               winningPlayer: "Id-of-player2",
               title: "Democracy now!",
          },
     ];

     getAllFinishedGames() {
          return Promise.resolve(this.inMemoryGames);
     }
}
