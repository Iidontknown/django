import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./routes/App";
import Login from "./routes/Login";
import Rejestracja from "./routes/Rejestracja";
import Lista from "./routes/Lista";
import Konto from "./routes/Konto";
import LogOut from "./routes/LogOut";
import { getCurrentUser } from "./services/auth.service";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import GrupaLista from "./components/GrupaLista";
import MenuBar from "./routes/MenuBar";
import Dodaj from "./components/katalog/Dodaj";
import Manage from "./components/katalog/Manage";
import KatalogMenu from "./components/katalog/KatalogMenu";
import StronaKatalog from "./components/katalog/StronaKatalog";
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
          <Route path="/lista" element={<Lista />} />
          <Route path="dodaj" element={<Dodaj />} />
          <Route path="konto" element={<Konto />} />
          <Route path="grupa" element={<GrupaLista />} />
          {/* <Route path="katalog" element={<Katalog />} /> */}
          <Route path="logout" element={<LogOut />} />
          <Route path="dodaj" element={<Dodaj />} />
          <Route path="konto" element={<Konto />} />
          <Route path="manage" element={<Manage />} />
          <Route path="katalog" element={<KatalogMenu />} />
          <Route path="StronaKatalog" element={<StronaKatalog />} />
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
