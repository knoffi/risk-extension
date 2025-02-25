import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ToClient } from '../../../../shared/socket/events';
import { MESSAGE_TO_CLIENT_EVENT } from '../../../../shared/socket/to-client/message.dto';
import { MESSAGE_FROM_CLIENT_EVENT, MessageFromClient } from '../../../../shared/socket/to-server/message.dto';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
  },
})
export class GameRoomGateway {
  @WebSocketServer()
  server: Server & { emit: (a: "foo", b: object, c: object) => boolean };

  handleConnection(socket: Socket) {
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