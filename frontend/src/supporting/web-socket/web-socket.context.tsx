import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { defaultConfigService } from "../config/config.service";
import { FromServer, ToServer } from "@shared/socket/events";
import { AuthContext } from "../auth.context";


type SocketIO = ReturnType<typeof io>;
type LifecycleEvent = "connect" | "connect_error" | "disconnect";
type LifecycleListener = () => ReturnType<SocketIO["on"]>;
type OnLifecycle = (event: LifecycleEvent, listener: LifecycleListener) => void;
type Listener<T extends FromServer> = (payload: T["payload"]) => void
type OnCustom<T extends FromServer> = T["event"] extends LifecycleEvent ? never : (event: T["event"], listener: Listener<T>) => void

interface Socket {
    // Workaround for bad framework typing
    on: OnCustom<FromServer>;
    // Workaround for bad framework typing
    onLifecycle: OnLifecycle;
    isConnected: boolean;
    createdOn: Date | null;
    /**
     * id exists iff socket in connected
     */
    id?: string,
    emit: <T extends ToServer>(event: T["event"], payload: T["payload"]) => void,
}

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = (props: { children: ReactNode[] | ReactNode }) => {

    const [isReady, setIsReady] = useState<boolean>(false)
    const {token} = useContext(AuthContext);

    const ws = useRef<null | SocketIO>(null)


    useEffect(() => {
            console.log("I ran with token:" + token)
        if(!token){
            return;
        }

        const url = defaultConfigService.getSocketUrl();
        const wsSocket = io(url,
            { auth: { token} }
        );

        wsSocket.on("connect", () => {
            setIsReady(true);
            console.log("I am socket " + wsSocket.id)
        })
        wsSocket.on("connect_error", (error) => {
            // TODO: Implement Error Toast and/or Loading Spinner
            setIsReady(false);
            throw error;
        })
        wsSocket.on("disconnect", (reason) => {
            // TODO: Implement Error Toast and/or Loading Spinner
            setIsReady(false);
            throw new Error("Socket disconnected:" + reason)
        })

        ws.current = wsSocket

        return () => void wsSocket.disconnect();
    }, [token])

    const throwSocketUnreadyError = () => { throw new Error("Socket not ready") }

    const socketClient: Socket = {
        createdOn: new Date(), emit: ws.current?.emit.bind(ws.current) ?? throwSocketUnreadyError, isConnected: isReady, on: ws.current?.on.bind(ws.current) ?? throwSocketUnreadyError, onLifecycle: ws.current?.on.bind(ws.current) ?? throwSocketUnreadyError
    }

    return <SocketContext.Provider value={socketClient.isConnected ? socketClient : null}>{props.children}</SocketContext.Provider>
}