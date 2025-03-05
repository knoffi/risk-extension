import { SendMessage } from './core/messages/send/send.component';
import { IncomingMessage } from './core/messages/incoming/incoming-message.component';
import { defaultConfigService } from './supporting/config/config.service';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>{defaultConfigService.getNumberOfTurtles()}</p>
        <IncomingMessage/>
        <SendMessage/>
      </header>
    </div>
  );
}

export default App;
