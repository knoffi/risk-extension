import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
  },
})
export class GameRoomGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }

  @SubscribeMessage('response_message')
  async shouldNotHappen(@MessageBody() data: number): Promise<number> {
    console.log("WEIRD!")

    return undefined
  }

  handleConnection(socket: Socket) {
    console.log(`Socket connected: ${socket.id}.`);
  }

  // it will be handled when a client disconnects from the server
  handleDisconnect(socket: Socket) {
    console.log(`Socket disconnected: ${socket.id}`);
  }

  @SubscribeMessage('send_message')
  logMessage(@MessageBody() data: unknown, @ConnectedSocket() socket: Socket): void {
    this.server.emit("response_message", { message: "loool" })
    return undefined;
  }
}