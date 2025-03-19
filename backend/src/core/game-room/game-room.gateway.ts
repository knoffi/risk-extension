import {
     ConnectedSocket,
     MessageBody,
     SubscribeMessage,
     WebSocketGateway,
     WebSocketServer,
} from "@nestjs/websockets";
import { ToClient } from "@shared/src/core/game-room/socket/events";
import { MESSAGE_TO_CLIENT_EVENT } from "@shared/src/core/game-room/socket/to-client/message.dto";
import {
     MESSAGE_FROM_CLIENT_EVENT,
     MessageFromClient,
} from "@shared/src/core/game-room/socket/to-server/message.dto";
import { Server, Socket } from "socket.io";
import { AuthenticationService } from "src/supporting/authentication/authentication.service";

@WebSocketGateway({
     cors: {
          origin: ["http://localhost:4173", "http://localhost:5173"],
     },
})
export class GameRoomGateway {
     @WebSocketServer()
     server: Server;

     constructor(private authService: AuthenticationService) {}

     async handleConnection(socket: Socket) {
          const { token } = socket.handshake.auth;
          if (!token || typeof token != "string") {
               socket._error({
                    message: "Missing auth token or auth token is no string",
               });

               socket.disconnect(true);
               console.error(`Closed ${socket.id} due to missing auth token`);
               return;
          }

          const tokenIsValid = await this.authService.verifyToken(token);
          if (!tokenIsValid) {
               socket._error({ message: "Auth token found, but was invalid" });

               socket.disconnect(true);
               console.error(`Closed ${socket.id} due to invalid auth token`);
               return;
          }

          console.log(`Socket connected: ${socket.id}.`);
     }

     handleDisconnect(socket: Socket) {
          console.log(`Socket disconnected: ${socket.id}`);
     }

     @SubscribeMessage(MESSAGE_FROM_CLIENT_EVENT)
     logMessage(
          @MessageBody() data: MessageFromClient,
          @ConnectedSocket() socket: Socket
     ): void {
          console.log("Incoming message from socket id " + socket.id);
          this.emitToAll(MESSAGE_TO_CLIENT_EVENT, {
               message: `User ${data.senderId} says: ${data.message}`,
          });
          return undefined;
     }

     private emitToAll<T extends ToClient>(
          event: T["event"],
          payload: T["payload"]
     ) {
          this.server.emit(event, payload);
     }
}
