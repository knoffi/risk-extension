import {
    FinishedGame as FinishedGameRaw,
    GetHistoryResponse,
} from "@shared/src/core/game/dto";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { Pages } from "src/pages";
import { defaultConfigService } from "src/supporting/config/config.service";

type FinishedGame = Omit<FinishedGameRaw, "endedAt" | "startedAt"> & {
    endedAt: Date;
    startedAt: Date;
};

function transform(game: FinishedGameRaw): FinishedGame {
    return {
        ...game,
        endedAt: new Date(game.endedAt),
        startedAt: new Date(game.startedAt),
    };
}

export const GameHistoryPage: React.FC = () => {
    const [history, setHistory] = useState<FinishedGame[]>([]);

    useEffect(() => {
        const url = defaultConfigService.getApiOrigin() + "/api/game-history";
        fetch(url).then((res) => {
            res.json().then((foo: GetHistoryResponse) => {
                const transformedGames = foo.games.map((game) =>
                    transform(game)
                );
                setHistory(transformedGames);
            });
        });
    }, []);

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <h1>Game History</h1>
            <FinishedGames games={history} />
            <p>
                <NavLink title="Back to Login" to={Pages.LOGIN_PUBLIC} />
            </p>
        </div>
    );
};

const FinishedGames = (props: { games: FinishedGame[] }) => {
    return (
        <ol>
            {props.games.map((game) => (
                <Game game={game} key={game.gameId} />
            ))}
        </ol>
    );
};

const Game = (props: { game: FinishedGame }) => {
    const durationInHours = Math.round(
        (props.game.endedAt.valueOf() - props.game.startedAt.valueOf()) /
            (60 * 60 * 1000)
    );
    return (
        <li>
            "{props.game.title ?? "Untitled"}": {props.game.winningPlayer} won
            in {durationInHours} hours
        </li>
    );
};
