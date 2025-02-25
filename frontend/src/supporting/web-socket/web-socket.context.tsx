import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { defaultConfigService } from "../config/config.service";


type SocketIO = ReturnType<typeof io>;
type LifecycleEvent = "connect" | "connect_error" | "disconnect";
type LifecycleListener = () => ReturnType<SocketIO["on"]>;
type CustomEvent = "exception" | "response_message"
type CustomListener = (...args: any[]) => void

interface Socket {
    on: (event: CustomEvent, listener: CustomListener) => void;
    // Workaround for bad framework typing
    onLifecycle: (event: LifecycleEvent, listener: LifecycleListener) => void;
    isConnected: boolean;
    createdOn: Date | null;
    /**
     * id exists iff socket in connected
     */
    id?: string,
    emit: SocketIO["emit"],
}

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = (props: { children: ReactNode[] | ReactNode }) => {

    const [isReady, setIsReady] = useState<boolean>(false)

    const ws = useRef<null | SocketIO>(null)


    useEffect(() => {
        const url = defaultConfigService.getSocketUrl();
        const wsSocket = io(url);

        wsSocket.on("connect", () => {
            setIsReady(true);
        })
        wsSocket.on("connect_error", () => {
            // TODO: Implement Error Toast and/or Loading Spinner
            console.error("Connect error!")
            setIsReady(false);
        })
        wsSocket.on("disconnect", () => {
            // TODO: Implement Error Toast and/or Loading Spinner
            console.error("Disconnected!")
            setIsReady(false);
        })

        ws.current = wsSocket

        return () => void wsSocket.disconnect();
    }, [])

    const throwSocketUnreadyError = () => { throw new Error("Socket not ready") }

    const socketClient: Socket = {
        createdOn: new Date(), emit: ws.current?.emit.bind(ws.current) ?? throwSocketUnreadyError, isConnected: isReady, on: ws.current?.on.bind(ws.current) ?? throwSocketUnreadyError, onLifecycle: ws.current?.on.bind(ws.current) ?? throwSocketUnreadyError
    }

    return <SocketContext.Provider value={socketClient.isConnected? socketClient : null}>{props.children}</SocketContext.Provider>
}