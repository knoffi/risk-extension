export interface MessageToClient{
    message:string
}
export const MESSAGE_TO_CLIENT_EVENT = "response_message"

export type MessageFromServer = MessageToClient
export const MESSAGE_FROM_SERVER_EVENT = MESSAGE_TO_CLIENT_EVENT