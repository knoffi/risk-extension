import { SendMessage } from './core/messages/send/send.component';
import { IncomingMessage } from './core/messages/incoming/incoming-message.component';
import { defaultConfigService } from './supporting/config/config.service';
import { useContext } from 'react';
import { AuthContext } from './supporting/auth.context';

function App() {
  const { token } = useContext(AuthContext)

  return (
    <div className="App">
      <header className="App-header">
        <p>{defaultConfigService.getNumberOfTurtles()}</p>
        <p>Token: {token == null? "null" : token}</p>
        <IncomingMessage />
        <SendMessage />
      </header>
    </div>
  );
}

export default App;
