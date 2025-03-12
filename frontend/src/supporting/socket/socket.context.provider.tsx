import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../authenticated/auth.context";
import { defaultConfigService } from "../config/config.service";
import { SocketContext, SocketIO, SocketService } from "./socket.context";

export const SocketProvider = (props: {
    children: ReactNode[] | ReactNode;
}) => {
    const [isReady, setIsReady] = useState<boolean>(false);
    const { token } = useContext(AuthContext);

    const ws = useRef<null | SocketIO>(null);

    useEffect(() => {
        console.log("I ran with token:" + token);
        if (!token) {
            return;
        }

        const url = defaultConfigService.getSocketUrl();
        const wsSocket = io(url, { auth: { token } });

        wsSocket.on("connect", () => {
            setIsReady(true);
            console.log("I am socket " + wsSocket.id);
        });
        wsSocket.on("connect_error", (error) => {
            // TODO: Implement Error Toast and/or Loading Spinner
            setIsReady(false);
            throw error;
        });
        wsSocket.on("disconnect", (reason) => {
            // TODO: Implement Error Toast and/or Loading Spinner
            setIsReady(false);
            throw new Error("Socket disconnected:" + reason);
        });

        ws.current = wsSocket;

        return () => void wsSocket.disconnect();
    }, [token]);

    const throwSocketUnreadyError = () => {
        throw new Error("Socket not ready");
    };

    const socketClient: SocketService = {
        createdOn: new Date(),
        emit: ws.current?.emit.bind(ws.current) ?? throwSocketUnreadyError,
        isConnected: isReady,
        on: ws.current?.on.bind(ws.current) ?? throwSocketUnreadyError,
        onLifecycle: ws.current?.on.bind(ws.current) ?? throwSocketUnreadyError,
    };

    return (
        <SocketContext.Provider
            value={socketClient.isConnected ? socketClient : null}
        >
            {props.children}
        </SocketContext.Provider>
    );
};
