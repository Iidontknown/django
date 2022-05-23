import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from './App';
import Ala from './Ala';

const root:ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  
  <BrowserRouter>
  <navbar />
  <Routes>
    <Route path="/" element={<App />}/>
    <Route path="ala" element={<Ala />} />
    
  </Routes>
</BrowserRouter>

);

