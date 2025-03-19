export interface MessageToServer {
     senderId: string;
     message: string;
}
export const MESSAGE_TO_SERVER_EVENT = "send_message";

export type MessageFromClient = MessageToServer;
export const MESSAGE_FROM_CLIENT_EVENT = MESSAGE_TO_SERVER_EVENT;
