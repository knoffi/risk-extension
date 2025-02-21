import React, { useContext } from 'react'; // Import necessary modules from React
import io from 'socket.io-client'; // Import the socket.io client library
import { WebsocketContext2 } from './socket.context';

// Establish a socket connection to the server at the specified URL
// const socket = io('http://localhost:3001');

export function SocketButton2() {

  const { emit } = useContext(WebsocketContext2)

  const sendMessage = async () => {

    emit("send_message", {
      senderId: "123",
      receiverId: "456",
      message: "Hello there too"
    });

  }

  return (
    <div>
      <button onClick={sendMessage}>Emit that shit</button> {/* Button to trigger sending a message */}
    </div>
  );
}