import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './service-worker-registration';
import { BrowserRouter, Route, Routes } from "react-router"
import { LoginPage } from './supporting/login/login.page';
import { HeaderComponent } from './supporting/navigation/header.component';
import { AuthProvider } from './supporting/auth.context.provider';
import { SocketProvider } from './supporting/web-socket/web-socket.context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <SocketProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HeaderComponent />}>
              <Route path="home" element={<App />} />
              <Route path="login" element={<LoginPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();