import React, { useContext } from 'react'; 
import { SocketContext } from '../../../supporting/web-socket/web-socket.context';

// Establish a socket connection to the server at the specified URL

export function SendMessage() {

  const foo = useContext(SocketContext)

  const sendMessage = async () => {

    if (foo) {
      foo.emit("send_message", {
        senderId: "123", receiverId: "456",
        message: "ABCDEFG"
      })
    }
    else {
      // TODO: Show error toast instead
      console.error("NO Message!")
    }

  }

  return (
    <div>
      {foo != null ? <button onClick={sendMessage}>send message!!!</button> : <p>Socket missing</p>}
    </div>
  );
}