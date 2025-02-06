import React, { useEffect, useState } from "react"
import { socket } from "../socket";

export const SocketConnection: React.FC = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState<unknown[]>([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value: unknown[]) {
      setFooEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  }, []);

  return (
    <div className="App">
      <ConnectionState isConnected={isConnected} />
      <Events events={fooEvents} />
      {/* <ConnectionManager /> */}
    </div>)
}

const Events = (props: { events: unknown[] }) => {
  return <p>{props.events.join(", ")}</p>
}
const ConnectionState = (props: { isConnected: boolean }) => {
  return <p>{props.isConnected ? "IS connected" : "is not connected"}</p>
}