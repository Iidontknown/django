import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from './routes/App';
import Ala from './routes/Ala';
import Login from './routes/Login';
import Rejestracja from './routes/Rejestracja';
import Dodaj from './routes/Dodaj';
import Lista from './routes/Lista';
const root:ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
         <Route path="zalogujsie/" element={<Login />} />
         <Route path="rejestracja" element={<Rejestracja />} />
         <Route path="dodaj" element={<Dodaj />} />
         <Route path="konto" element={<Login />} />
         <Route path="lista" element={<Lista />} />
         <Route path="*" element={ <main style={{ padding: "1rem" }}> <p>404!</p></main>}/>
      </Routes>
    </BrowserRouter>

);

