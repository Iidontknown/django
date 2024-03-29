import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./routes/App";
import Login from "./routes/Login";
import Rejestracja from "./routes/Rejestracja";
import Konto from "./routes/Konto";
import LogOut from "./routes/LogOut";
import { getCurrentUser } from "./services/auth.service";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import GrupaLista from "./components/GrupaLista";
import MenuBar from "./routes/MenuBar";
import Dodaj from "./components/katalog/Dodaj";
import KatalogMenu from "./components/katalog/KatalogMenu";
import StronaKatalog from "./components/katalog/StronaKatalog";
import Wyszukaj from "./routes/Wyszukaj";
import Katalog from "./routes/Katalog";
import Lista from "./routes/Lista";
const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const currentUser = getCurrentUser();
root.render(
  <>
    <BrowserRouter>
      <MenuBar />
      <Routes>
      <Route path="/" element={<App />} />
        <Route path="login/" element={<Login />} />
        <Route path="rejestracja" element={<Rejestracja />} />

        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="lista" element={<Lista />} />
          <Route path="dodaj" element={<Dodaj />} />
          <Route path="konto" element={<Konto />} />
          <Route path="grupa" element={<GrupaLista />} />
          <Route path="logout" element={<LogOut />} />
          <Route path="dodaj" element={<Dodaj />} />
          <Route path="konto" element={<Konto />} />
          <Route path="wyszukaj" element={<Wyszukaj />} />
          <Route path="wyszukaj/:tekst/" element={<Wyszukaj />} />
          <Route path="wyszukaj/:id/:idstrona/" element={<Wyszukaj />} />
          <Route path="katalog" element={<Katalog />} />
          <Route path="katalog/:id" element={<KatalogMenu />} />
          <Route path="katalog/:id/:idstrona/" element={<StronaKatalog />} />
        </Route>

    
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              {" "}
              <p>404!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  </>
);
