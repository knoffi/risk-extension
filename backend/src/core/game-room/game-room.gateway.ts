import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException
} from '@nestjs/websockets';
import { ToClient } from '@shared/socket/events';
import { MESSAGE_TO_CLIENT_EVENT } from '@shared/socket/to-client/message.dto';
import { MESSAGE_FROM_CLIENT_EVENT, MessageFromClient } from '@shared/socket/to-server/message.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
  },
})
export class GameRoomGateway {
  @WebSocketServer()
  server: Server & { emit: (a: "foo", b: object, c: object) => boolean };


  handleConnection(socket: Socket) {
    if(!socket.handshake.auth.token){
      socket._error({message:"Missing auth token"})
      socket.disconnect(true);
      console.error(`Closed ${socket.id} due to missing auth token`)
      return;
    }

    console.log(`Socket connected: ${socket.id}.`);
  }

  handleDisconnect(socket: Socket) {
    console.log(`Socket disconnected: ${socket.id}`);
  }

  @SubscribeMessage(MESSAGE_FROM_CLIENT_EVENT)
  logMessage(@MessageBody() data: MessageFromClient, @ConnectedSocket() socket: Socket): void {
    console.log("Incoming message from socket id " + socket.id)
    this.emitToAll(MESSAGE_TO_CLIENT_EVENT, { message: `User ${data.senderId} says: ${data.message}` })
    return undefined;
  }

  private emitToAll<T extends ToClient>(event: T["event"], payload: T["payload"]) {
    this.server.emit(event, payload)
  }
}