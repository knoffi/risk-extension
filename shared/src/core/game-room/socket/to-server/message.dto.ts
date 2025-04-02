import { GetUserResponse } from "@shared/src/supporting/user/dto";

export type MessageToServerSender = GetUserResponse;

export interface MessageToServer {
     sender: MessageToServerSender;
     message: string;
}
export const MESSAGE_TO_SERVER_EVENT = "send_message";

export type MessageFromClient = MessageToServer;
export const MESSAGE_FROM_CLIENT_EVENT = MESSAGE_TO_SERVER_EVENT;
