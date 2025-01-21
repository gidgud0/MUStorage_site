// src/index.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store from './store.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './login/reg/src/registr.tsx';
import Menu from './menu.tsx'
import Reset from './login/pswrd_reset/PasswordReset.tsx'
import UsernameReset from "./login/pswrd_reset/username/usernameNav.tsx"
import EmailReset from "./login/pswrd_reset/email/emailNav.tsx"


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/throughUsername" element={<UsernameReset />} />
          <Route path="/throughEmail" element={<EmailReset />} />
        </Routes>
      </Router>
    </Provider>
  </StrictMode>
);
