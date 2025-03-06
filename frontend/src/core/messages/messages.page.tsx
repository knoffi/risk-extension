import { useContext } from "react"
import { defaultConfigService } from "../../supporting/config/config.service"
import { IncomingMessage } from "./incoming/incoming-message.component"
import { SendMessage } from "./send/send.component"
import { AuthContext } from "../../supporting/auth.context"

export const MessagesPage = ()=>{
    const { token } = useContext(AuthContext)
    
    return <div className="App">
          <header className="App-header">
            <p>{defaultConfigService.getNumberOfTurtles()}</p>
            <p>Token: {token == null? "null" : token}</p>
            <IncomingMessage />
            <SendMessage />
          </header>
        </div>
}