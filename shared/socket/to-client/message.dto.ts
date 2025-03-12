export interface MessageToClient {
     message: string;
}
export const MESSAGE_TO_CLIENT_EVENT = "response_message";

export type MessageFromServer = MessageToClient;
export const MESSAGE_FROM_SERVER_EVENT = MESSAGE_TO_CLIENT_EVENT;

function forTestingLinterAndPrettier() {
return console.log(
          "1n19fha8z2934h2193h4ß93qsj4q54fw4pgsdfkfjhgosdfjgfpdkjgerpjgrölmtlskrtg"
     );
}
