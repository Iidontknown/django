import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../services/auth.service";
import MenuBar from "./MenuBar";
import getGrupaall from "../services/GrupyService";
import GrupaData from "./../types/grupa";
import GrupyService from "../services/GrupyService";
import { Link } from "react-router-dom";
const API_URL = "http://localhost:8000/api/";

const Konto: React.FC = () => {
  const currentUser = getCurrentUser();
  let refresh: any = "";
  refresh = localStorage.getItem("refresh");
  let access = localStorage.getItem("access");
  console.log(window.location.protocol + "//" + window.location.host);

  const [listaGrup, setlistaGrup] = useState<Array<GrupaData>>([]);
  console.log(getGrupaall);

  console.log(listaGrup);
  useEffect(() => {
    GrupyService.getGrupaall().then(
      (response) => {
        try {
          setlistaGrup(response.data);
        } catch (error) {
          console.log(error);
        }
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(error);
      }
    );
  }, []);

  return (
    <>
      <div className="container bg-light   ">
        <header className="jumbotron">
          <h3>
            Witaj: <strong>{currentUser.username}</strong>
          </h3>
        </header>
        {/* <p>{refresh}</p>  
       <strong>{access}</strong>  */}
        {/* <p>
        <strong>Id:</strong> {currentUser.user_id}
      </p> */}
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <Link to="/grupa">
          <strong>katalogi którymi jestes właścicielem :</strong>{" "}
        </Link>
        <ul>
          <li>Deutz fahr 4075/4080/4090 -/h/hts</li>
        </ul>{" "}
        <Link to="/grupa">
          <strong>Grupy którymi jestes właścicielem :</strong>
        </Link>
        <ul>
          {listaGrup &&
            listaGrup.map((val) => <li key="{val.id}"> {val.nazwa_grupa}</li>)}
        </ul>
      </div>
    </>
  );
};

export default Konto;
