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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </Router>
    </Provider>
  </StrictMode>
);
