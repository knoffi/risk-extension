import { io } from "socket.io-client";

export class SocketService{
    constructor(){
        const socket = io('http://localhost:3002');
      socket.on('connect', function() {
        console.log('Connected');

        socket.emit('events', { test: 'test' });
        socket.emit('identity', 0, (response:unknown) =>
          console.log('Identity:', response),
        );
      });
      socket.on('events', function(data) {
        console.log('event', data);
      });
      socket.on('exception', function(data) {
        console.log('event', data);
      });
      socket.on('disconnect', function() {
        console.log('Disconnected');
      });

      socket.connect();
    }
}