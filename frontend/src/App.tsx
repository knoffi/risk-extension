import React from 'react';
import './App.css';
import { SocketConnection } from './supporting/SocketConnection';
import { SocketButton } from './supporting/SocketButton';
import { SocketProvider } from './supporting/web-socket/web-socket.context';
import { SocketButton2 } from './supporting/SocketButton2';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SocketConnection/>
        <SocketButton/>
        <SocketButton2/>
      </header>
    </div>
  );
}

export default App;
