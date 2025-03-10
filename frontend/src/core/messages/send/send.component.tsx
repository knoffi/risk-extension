import { MESSAGE_TO_SERVER_EVENT } from '@shared/socket/to-server/message.dto';
import { useContext, useRef, useState } from 'react';
import { SocketContext } from '../../../supporting/socket/socket.context';

export function SendMessage() {

  const [msg, setMsg] = useState("");
  const socket = useContext(SocketContext)
  const senderId = useRef(new Date().toLocaleTimeString("de").replace(/:/g, ""))

  const sendMessage = async () => {

    if (!socket || !socket.isConnected) {
      // TODO: Show error toast instead, if button is disabled and we still get here
      throw new Error("Socket missing or disconnected")
    }

    socket.emit(MESSAGE_TO_SERVER_EVENT, {
      senderId: senderId.current,
      message: msg
    })
  }

  return (
    <div>
      <div style={{ backgroundColor: "grey" }}>{`You are user: ${senderId.current}`}</div>
      <input type="text" onChange={(e) => setMsg(e.target.value)} value={msg} />
      <button onClick={sendMessage} disabled={socket == null}>Send Message</button>
    </div>
  );
}