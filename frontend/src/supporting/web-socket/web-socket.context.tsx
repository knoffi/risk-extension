import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";


type SocketIO = ReturnType<typeof io>;
type LifecycleEvent = "connect" | "connect_error" | "disconnect";
type LifecycleListener = () => ReturnType<SocketIO["on"]>;
type SentCustomEvent = "exception" | "event" | "send_message"
type ReceivedCustomEvent = never
type CustomListener = (...args: any[]) => ReturnType<SocketIO["on"]>

type SendMessage = string
type ReceivedDto = any

interface Socket {
    on: (event: SentCustomEvent, listener: CustomListener) => void;
    // Workaround for bad framework typing
    onLifecycle: (event: LifecycleEvent, listener: LifecycleListener) => void;
    isConnected: boolean;
    createdOn: Date | null;
    /**
     * id exists iff socket in connected
     */
    id?: string,
    emit: SocketIO["emit"],
    lastReceived: ReceivedDto | null,
}

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = (props: { children: ReactNode[] | ReactNode }) => {

    const [isReady, setIsReady] = useState<boolean>(false)
    const [value, setValue] = useState<ReceivedDto>(null)

    const ws = useRef<null | SocketIO>(null)


    useEffect(() => {
        const wsSocket = io('http://localhost:3001');

        wsSocket.on("connect", () => {
            console.error("Connected!")
            setIsReady(true);
        })
        wsSocket.on("connect_error", () => {
            console.error("Connect error!")
            setIsReady(false);
        })
        wsSocket.on("disconnect", () => {
            console.error("Disconnected!")
            setIsReady(false);
        })

        wsSocket.onAny((event, ...args) => setValue({ event, args }))

        ws.current = wsSocket

        return () => void wsSocket.disconnect();
    }, [])

    const throwSocketUnreadyError = () => { throw new Error("Socket not ready") }

    const socketClient = {
        createdOn: new Date(), emit: ws.current?.emit.bind(ws.current) ?? throwSocketUnreadyError, isConnected: isReady, lastReceived: value, on: ws.current?.on ?? throwSocketUnreadyError, onLifecycle: ws.current?.on ?? throwSocketUnreadyError
    } satisfies Socket

    return <SocketContext.Provider value={socketClient || null}>{props.children}</SocketContext.Provider>
}