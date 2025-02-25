import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../../supporting/web-socket/web-socket.context";

export const IncomingMessage: React.FC = () => {

  const [received, setReceived] = useState<object | null>(null);
  const socket = useContext(SocketContext)
  useEffect(() => {
    console.error("I set the socket with " + socket?.createdOn)
    socket?.on("response_message", (payload) => {
      console.error(" I got something!")
      setObjectOrThrow(payload,setReceived)
    })

  }, [socket])

  return (
    <div className="App">
      <ConnectionState isConnected={socket ? socket.isConnected : null} />
      <LastReceived events={received ? [JSON.stringify(received)] : []} />
      <p>{socket ? socket.createdOn?.toISOString() : "Socket is null"}</p>
    </div>)
}

const LastReceived = (props: { events: unknown[] }) => {
  return <p>{props.events.join(", ")}</p>
}
const ConnectionState = (props: { isConnected: boolean | null }) => {
  return <p>{props.isConnected ? "IS connected" : props.isConnected === false ? "is not connected" : "Was null"}</p>
}

function setObjectOrThrow(value: unknown, setObjectValue: (newValue: object) => void) {
  if (value == null || typeof value != "object")
    throw new Error("Value is not an object: " + value)

  setObjectValue(value)

}