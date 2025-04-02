import { useContext } from "react";
import { AuthContext } from "src/supporting/authenticated/auth.context";
import { defaultConfigService } from "src/supporting/config/config.service";
import { IncomingMessage } from "./incoming/incoming-message.component";
import { SendMessage } from "./send/send.component";

export const MessagesPage: React.FC = () => {
    const { token } = useContext(AuthContext);

    return (
        <div className="App">
            <header className="App-header">
                <p>{defaultConfigService.getNumberOfTurtles()}</p>
                <p>Token: {token == null ? "null" : token}</p>
                <IncomingMessage />
                <SendMessage />
            </header>
        </div>
    );
};
