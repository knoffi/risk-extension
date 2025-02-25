import './App.css';
import { SocketButton } from './supporting/SocketButton';
import { SocketConnection } from './supporting/SocketConnection';

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
