import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from './routes/App';
import Login from './routes/Login';
import Rejestracja from './routes/Rejestracja';
import Dodaj from './routes/Dodaj';
import Lista from './routes/Lista';
import Katalog from './routes/katalog';
import Konto from './routes/Konto';
import LogOut from './routes/LogOut';
import { getCurrentUser } from './services/auth.service';
import ProtectedRoutes from './routes/ProtectedRoutes';
const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const currentUser = getCurrentUser();
root.render(

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="login/" element={<Login />} />
      <Route path="rejestracja" element={<Rejestracja />} />
   
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/lista" element={<Lista />} />
        <Route path="dodaj" element={<Dodaj />} />
        <Route path="konto" element={<Konto />} />
        <Route path="katalog" element={<Katalog />} />
        <Route path="logout" element={<LogOut />} />
        <Route path="dodaj" element={<Dodaj />} />
      <Route path="konto" element={<Konto />} />
      </Route>
      <Route path="*" element={<main style={{ padding: "1rem" }}> <p>404!</p></main>} />
    </Routes>
  </BrowserRouter>

);

