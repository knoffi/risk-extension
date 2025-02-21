import React, { useContext, useEffect, useState } from "react"
import { SocketContext } from "./web-socket/web-socket.context";
// import { socket } from "../socket";

export const SocketConnection: React.FC = () => {
  // const [isConnected, setIsConnected] = useState(socket.connected);
  // const [fooEvents, setFooEvents] = useState<unknown[]>([]);

  const socket = useContext(SocketContext)

  // useEffect(() => {
  //   function onConnect() {
  //     setIsConnected(true);
  //   }

  //   function onDisconnect() {
  //     setIsConnected(false);
  //   }

  //   function onFooEvent(value: unknown[]) {
  //     setFooEvents(previous => [...previous, value]);
  //   }

  //   socket.on('connect', onConnect);
  //   socket.on('disconnect', onDisconnect);
  //   socket.on('foo', onFooEvent);

  //   return () => {
  //     socket.off('connect', onConnect);
  //     socket.off('disconnect', onDisconnect);
  //     socket.off('foo', onFooEvent);
  //   };
  // }, []);



  return (
    <div className="App">
      <ConnectionState isConnected={socket? socket.isConnected : null} />
      <Events events={socket ? [socket.lastReceived]:[]} />
      <p>{socket? socket.createdOn?.toISOString() : "Socket is null"}</p>
      {/* <ConnectionManager /> */}
    </div>)
}

const Events = (props: { events: unknown[] }) => {
  return <p>{props.events.join(", ")}</p>
}
const ConnectionState = (props: { isConnected: boolean|null }) => {
  return <p>{props.isConnected ? "IS connected" : props.isConnected === false? "is not connected" : "Was null"}</p>
}