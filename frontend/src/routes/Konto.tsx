import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../services/auth.service";
import MenuBar from "./MenuBar";
import getGrupaall from "../services/GrupyService";
import GrupaData from "./../types/grupa";
import GrupyService from "../services/GrupyService";
import { Link } from "react-router-dom";
import KatalogService from "../services/KatalogService";
import KatalogData from "../types/katalog";
import ListaData from "../types/lista";
import listaService from "../services/ListaService";
const API_URL = "http://localhost:8000/api/";

const Konto: React.FC = () => {
  const currentUser = getCurrentUser();
  
  const [Katalogi, setKatalogi] = React.useState<Array<KatalogData>>([]);
  const [Listy, setListy] = React.useState<Array<ListaData>>([]);
  let refresh: any = "";
  refresh = localStorage.getItem("refresh");
  let access = localStorage.getItem("access");
  console.log(window.location.protocol + "//" + window.location.host);

  const [listaGrup, setlistaGrup] = useState<Array<GrupaData>>([]);
  console.log(getGrupaall);

  console.log(listaGrup);
  useEffect(() => {
    getalllisty()
    getallkatalog()
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

  const getallkatalog = () => {
    KatalogService.getall()
      .then((response: any) => {
        setKatalogi(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const getalllisty = () => {
    listaService.getall()
      .then((response: any) => {
        setListy(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };


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
        <Link to="/lista">
          <strong>katalogi którymi jestes właścicielem :</strong>{" "}
        </Link>
        <ul>
        {Katalogi &&
            Katalogi.map((val) => <Link to={`/katalog/${val.id}`}> <li key="{val.id}"> {val.nazwa_katalog}</li></Link>)}
        </ul>{" "}
        <Link to="/grupa">
          <strong>Grupy którymi jestes właścicielem :</strong>
        </Link>
        <ul>
          {listaGrup &&
            listaGrup.map((val) => <li key="{val.id}"> {val.nazwa_grupa}</li>)}
        </ul>
        <Link to="/lista">
          <strong>Twoje listy czesci:</strong>
        </Link> 
        <Link to='/lista'>Dodaj</Link><ul>
            {Listy &&
            Listy.map((val) => <Link to={`/lista/${val.id}`}> <li key="{val.id}"> {val.nazwa_lista}</li></Link>)}
            </ul>
      </div>
    </>
  );
};

export default Konto;
