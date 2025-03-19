import { BrowserRouter, Route, Routes } from "react-router";
import { GameHistoryPage } from "src/core/game-history/game-history.page";
import { AcknowledgementsPage } from "src/supporting/acknowledgements/acknowledgements.page";
import { MessagesPage } from "./core/messages/messages.page";
import { LoginPage } from "./supporting/login/login.page";
import { AuthenticatedGuard } from "./supporting/navigation/authenticated-guard.component";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/*Private Routes (Auth-required)*/}
                <Route path="/" element={<AuthenticatedGuard />}>
                    <Route path="home" element={<MessagesPage />} />
                    <Route path="messages" element={<MessagesPage />} />
                </Route>
                {/*Public Routes*/}
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/acknowledgements"
                    element={<AcknowledgementsPage />}
                />
                <Route path="/game-history" element={<GameHistoryPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
