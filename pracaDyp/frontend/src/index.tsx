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
const root:ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  
  <BrowserRouter>
  {/* <navbar /> */}
  <Routes>
    <Route path="/" element={<Ala />}/>
    <Route path="ala" element={<App />} />
    
  </Routes>
</BrowserRouter>

);

