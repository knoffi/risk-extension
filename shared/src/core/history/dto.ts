import { FractionId } from "@shared/src/core/fraction/dto";
import { PlayerId } from "@shared/src/core/player/dto";

export interface GetPreviousGamesResponse {
     games: FinishedGame[];
}

interface FinishedGame {
     startedAt: Date;
     endedAt: Date;
     winningFraction: FractionId;
     winningPlayer: PlayerId;
}
