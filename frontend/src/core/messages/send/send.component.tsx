import { MESSAGE_TO_SERVER_EVENT } from "@shared/src/core/game-room/socket/to-server/message.dto";
import { useContext, useState } from "react";
import { AuthContext } from "src/supporting/authenticated/auth.context";
import { SocketContext } from "src/supporting/socket/socket.context";

export function SendMessage() {
    const [msg, setMsg] = useState("");
    const socket = useContext(SocketContext);
    const { user } = useContext(AuthContext);

    const sendMessage = async () => {
        if (!socket || !socket.isConnected) {
            // TODO: Show error toast instead, if button is disabled and we still get here
            throw new Error("Socket missing or disconnected");
        }

        if (!user) {
            throw new Error("User required for sending messages via socket");
        }

        socket.emit(MESSAGE_TO_SERVER_EVENT, {
            sender: user,
            message: msg,
        });
    };

    return (
        <div>
            <input
                type="text"
                onChange={(e) => setMsg(e.target.value)}
                value={msg}
            />
            <button onClick={sendMessage} disabled={socket == null}>
                Send Message
            </button>
        </div>
    );
}
