import { FractionId } from "@shared/src/core/fraction/dto";
import { PlayerId } from "@shared/src/core/player/dto";
import { Flavor } from "@shared/src/util/flavor";

export interface GetHistoryResponse {
     games: FinishedGame[];
}

type GameId = Flavor<"game">;

type DateISOString = Flavor<"2025-03-19T16:08:55Z">;

export interface FinishedGame {
     gameId: GameId;
     startedAt: DateISOString;
     endedAt: DateISOString;
     winningFraction: FractionId;
     winningPlayer: PlayerId;
     title?: string;
}
