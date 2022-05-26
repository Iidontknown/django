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
import ErrorPage from './routes/ErrorPage';
import MenuBar from './routes/MenuBar';
const root:ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
 

  <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
         <Route path="login" element={<Ala />} />
         <Route path="rejestracja" element={<Ala />} />
         <Route path="dodaj" element={<Ala />} />
         <Route path="konto" element={<Ala />} />
         <Route path="*" element={ <main style={{ padding: "1rem" }}> <p>404!</p></main>}/>
      </Routes>
    </BrowserRouter>

);

