import { BrowserRouter, Route, Routes } from "react-router";
import { GameHistoryPage } from "src/core/game-history/game-history.page";
import { HomePage } from "src/core/home/home.page";
import { AcknowledgementsPage } from "src/supporting/acknowledgements/acknowledgements.page";
import { CanManageUsersGuard } from "src/supporting/permissions/can-manage-users-guard.component";
import { ManageUserPage } from "src/supporting/user-management/manage-user.page";
import { MessagesPage } from "./core/messages/messages.page";
import { AuthenticatedGuard } from "./supporting/authenticated/authenticated-guard.component";
import { LoginPage } from "./supporting/login/login.page";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/*Private Routes (Auth-required)*/}
                <Route path="/" element={<AuthenticatedGuard />}>
                    <Route path="home" element={<HomePage />} />
                    <Route path="messages" element={<MessagesPage />} />
                    {/*Restricted Routes (Game master required)*/}
                    <Route path="/" element={<CanManageUsersGuard />}>
                        <Route path="users" element={<ManageUserPage />} />
                    </Route>
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
