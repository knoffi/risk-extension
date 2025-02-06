import React from 'react';
import './App.css';
import { SocketConnection } from './supporting/SocketConnection';
import { SocketButton } from './supporting/SocketButton';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SocketConnection/>
        <SocketButton/>
      </header>
    </div>
  );
}

export default App;
