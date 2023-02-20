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
import GrupaUserData from "../types/grupauser";
import GrupaUserService from "../services/GrupaUserService";

import Select, { PropsValue, SingleValue } from "react-select";
const API_URL = "http://localhost:8000/api/";

const Konto: React.FC = () => {
  const currentUser = getCurrentUser();
  
  const [Katalogi, setKatalogi] = React.useState<Array<KatalogData>>([]);
  const [listagrupauser, setlistagrupauser] = React.useState<Array<GrupaUserData>>([]);
  const [Listy, setListy] = React.useState<Array<ListaData>>([]);
  let refresh: any = "";
  refresh = localStorage.getItem("refresh");
  let access = localStorage.getItem("access");
  
  const [listaGrup, setlistaGrup] = useState<Array<GrupaData>>([]);
  const [listagrupAll, setlistagrupAll] = useState<Array<GrupaData>>([]);
  const [selectgrupa, setselectgrupa] = useState<GrupaData|null>(null);

  

  console.log(getGrupaall);

  console.log(listaGrup);
  useEffect(() => {
    getalllisty()
    getallkatalog()
    getlistagrupauser()
    getallgrupa()
    GrupyService.get().then(
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
    KatalogService.getall_user()
      .then((response: any) => {
        setKatalogi(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const getallgrupa = () => {
    GrupyService.getall()
      .then((response: any) => {
        setlistagrupAll(response.data);
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

  
  const getlistagrupauser = () => {
    GrupaUserService.getall()
      .then((response: any) => {
        setlistagrupauser(response.data);
        console.log(response);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  
  const dodajgrupauser = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;
    if(selectgrupa!=null ){
      
      dodaj_GrupaUser(Number(selectgrupa.id))
    }
  };
  const dodaj_GrupaUser = (grupa:number) => {
    GrupaUserService.create(grupa
    )
      .then((response: any) => {
        console.log("dodano:" + response);

        window.location.reload();
        console.log(response);
      })
      .catch((e: Error) => {
        console.log(e);
      });
};




  const SelectgrupaOnchange = (selected: SingleValue<GrupaData>) => {
    setselectgrupa(selected)
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
        <Link to="/katalog">
          <strong>katalogi którymi jestes właścicielem :</strong>{" "}
        </Link>
        <ul>
        {Katalogi &&
            Katalogi.map((val) => <Link to={`/katalog/${val.id}`}> <li key={val.id}> {val.nazwa_katalog}</li></Link>)}
        </ul>{" "}
        <Link to="/grupa">
          <strong>Grupy którymi jestes właścicielem :</strong>
        </Link>
        <ul>
          {listaGrup &&
            listaGrup.map((val) => <li key={val.id}> {val.nazwa_grupa}</li>)}
        </ul>
        <Link to="/lista">
          <strong>Twoje listy czesci:</strong>
        </Link> <ul>
            {Listy &&
            Listy.map((val) => <Link to={`/lista/${val.id}`}> <li key={val.id}> {val.nazwa_lista}</li></Link>)}
            </ul>
          <strong>lista grupy do których przynależysz lub wysłałeś prośbę o członkostwo. </strong>
        <ul> <Select<GrupaData>
                  getOptionLabel={(grupa: GrupaData) => grupa.nazwa_grupa}
                  getOptionValue={(grupa: GrupaData) => grupa.id.toString()}
                  options={listagrupAll}
                  isClearable={true}
                  backspaceRemovesValue={true}
                  placeholder="wybierz grupę"
                  onChange={SelectgrupaOnchange}
                  value={selectgrupa}
                />
                <button onClick={dodajgrupauser}> Wyślij </button>
          {listagrupauser &&
            listagrupauser.map((val) => <li key={val.id}> {val.grupa_nazwa_grupa} {val.allow?(<><b>należysz</b></>):(<><b>Oczekujesz na akceptacje</b></>)}</li>)}
        </ul>
      </div>
    </>
  );
};

export default Konto;
