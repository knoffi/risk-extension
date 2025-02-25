import { MESSAGE_TO_CLIENT_EVENT, MessageToClient } from "./to-client/message.dto"
import { MESSAGE_TO_SERVER_EVENT, MessageToServer } from "./to-server/message.dto"

export type ToClient = {event:typeof MESSAGE_TO_CLIENT_EVENT,payload: MessageToClient}
export type FromServer = ToClient
export type ToClientEvent = ToClient["event"]
export type FromServerEvent = ToClientEvent

export type ToServer = {event:typeof MESSAGE_TO_SERVER_EVENT,payload: MessageToServer}
export type FromClient = ToServer
export type ToServerEvent = ToServer["event"]
export type FromClientEvent = ToServerEvent
