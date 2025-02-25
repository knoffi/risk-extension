import React, { useContext } from 'react';
import { SocketContext } from '../../../supporting/web-socket/web-socket.context';

export function SendMessage() {

  const socket = useContext(SocketContext)

  const sendMessage = async () => {

    if (!socket || !socket.isConnected) {
      // TODO: Show error toast instead, if button is disabled and we still get here
      throw new Error("Socket missing or disconnected")
    }

    socket.emit("send_message", {
      senderId: "123", receiverId: "456",
      message: "ABCDEFG"
    })
  }

  return (
    <div>
      <button onClick={sendMessage} disabled={socket == null}>Send Message</button> 
    </div>
  );
}