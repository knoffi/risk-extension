import { useState, useRef, useEffect, ReactNode } from "react"
import { io } from "socket.io-client"
import { createContext } from "react"
import React from "react"

interface Socket{
    isReady:boolean,
    value:unknown,
    emit:(event:"send_message", dto:object)=>void
}

export const WebsocketContext2 = createContext<Socket>({isReady:false, value:null, emit:() => {}})

// Make sure to put WebsocketProvider higher up in
// the component tree than any consumer.
export const WebsocketProvider2 = (props:{ children: ReactNode[] | ReactNode }) => {
  const [isReady, setIsReady] = useState(false)
  const [value, setValue] = useState(null)

  const ws = useRef<null|Pick<Socket,"emit">>(null)

  useEffect(() => {
    const wsSocket = io('http://localhost:3001')

    wsSocket.on("connect",() => setIsReady(true))
    wsSocket.on("disconnect", () => setIsReady(false))
    wsSocket.onAny((event) => setValue(event.data))

    wsSocket.connect();

    ws.current = wsSocket

    return () => {
      wsSocket.close()
    }
  }, [])

  const ret = {isReady, value, emit:ws.current?.emit.bind(ws.current)?? (()=>undefined)} satisfies Socket

  return (
    <WebsocketContext2.Provider value={ret}>
      {props.children}
    </WebsocketContext2.Provider>
  )
}