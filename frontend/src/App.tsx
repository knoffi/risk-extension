import { BrowserRouter, Route, Routes } from "react-router";
import { MessagesPage } from "./core/messages/messages.page";
import { LoginPage } from "./supporting/login/login.page";
import { AuthenticatedGuard } from "./supporting/navigation/authenticated-guard.component";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthenticatedGuard />}>
                    <Route path="home" element={<MessagesPage />} />
                    <Route path="messages" element={<MessagesPage />} />
                </Route>
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
