import React, { useContext } from 'react'; // Import necessary modules from React
import io from 'socket.io-client'; // Import the socket.io client library
import { SocketContext } from './web-socket/web-socket.context';

// Establish a socket connection to the server at the specified URL

export function SocketButton() {

  const foo = useContext(SocketContext)

  // const socket = io('http://localhost:3001')

  // Function to send a message
  const sendMessage = async () => {

    if(foo){
      foo.emit("send_message", {
        senderId: "123",     // ID of the sender
        receiverId: "456", // ID of the receiver
        message: "ABCDEFG"   // The actual message content
      })}
      else {
        console.error("NO Message!")
      }
    
  }

  return (
    <div>
       {foo != null ? <button onClick={sendMessage}>send message!!!</button>: <p>Socket missing</p>}
    </div>
  );
}