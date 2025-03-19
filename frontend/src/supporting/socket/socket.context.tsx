import { FromServer, ToServer } from "@shared/src/core/game-room/socket/events";
import { createContext } from "react";
import { io } from "socket.io-client";

export type SocketIO = ReturnType<typeof io>;
type LifecycleEvent = "connect" | "connect_error" | "disconnect";
type LifecycleListener = () => ReturnType<SocketIO["on"]>;
type OnLifecycle = (event: LifecycleEvent, listener: LifecycleListener) => void;
type Listener<T extends FromServer> = (payload: T["payload"]) => void;
type OnCustom<T extends FromServer> = T["event"] extends LifecycleEvent
    ? never
    : (event: T["event"], listener: Listener<T>) => void;

export interface SocketService {
    // Workaround for bad framework typing
    on: OnCustom<FromServer>;
    // Workaround for bad framework typing
    onLifecycle: OnLifecycle;
    isConnected: boolean;
    createdOn: Date | null;
    /**
     * id exists iff socket in connected
     */
    id?: string;
    emit: <T extends ToServer>(
        event: T["event"],
        payload: T["payload"]
    ) => void;
}

export const SocketContext = createContext<SocketService | null>(null);
