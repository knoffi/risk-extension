import './App.css';
import { SendMessage } from './core/messages/send/send.component';
import { IncomingMessage } from './core/messages/incoming/incoming-message.component';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <IncomingMessage/>
        <SendMessage/>
      </header>
    </div>
  );
}

export default App;
