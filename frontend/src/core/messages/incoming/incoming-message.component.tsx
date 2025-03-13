import { MessageFromServer } from "@shared/socket/to-client/message.dto";
import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "src/supporting/socket/socket.context";

export const IncomingMessage: React.FC = () => {
    const [received, setReceived] = useState<MessageFromServer | null>(null);
    const socket = useContext(SocketContext);

    useEffect(() => {
        socket?.on("response_message", (payload) => {
            setReceived(payload);
        });
    }, [socket]);

    return (
        <div className="App">
            <ConnectionState isConnected={socket ? socket.isConnected : null} />
            <LastReceived events={received ? [JSON.stringify(received)] : []} />
            <p>{socket ? socket.createdOn?.toISOString() : "Socket is null"}</p>
        </div>
    );
};

const LastReceived = (props: { events: unknown[] }) => {
    return <p>{props.events.join(", ")}</p>;
};
const ConnectionState = (props: { isConnected: boolean | null }) => {
    return (
        <p>
            {props.isConnected
                ? "IS connected"
                : props.isConnected === false
                  ? "is not connected"
                  : "Was null"}
        </p>
    );
};
