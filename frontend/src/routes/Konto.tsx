import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../services/auth.service";
import MenuBar from "./MenuBar";
import getGrupaall from "../services/GrupyService";
import GrupaData from './../types/grupa';
const API_URL = "http://localhost:8000/api/";


const Konto: React.FC = () => {
  const currentUser = getCurrentUser();
  let refresh : any = ""
  refresh = localStorage.getItem("refresh");
  let access = localStorage.getItem("access");
  
 
  const [listaGrup, setlistaGrup] = useState<Array<GrupaData>>();
  // console.log(getGrupaall)

  console.log(listaGrup)
useEffect(() => {
    getGrupaall().then(
      (response) => {
        setlistaGrup(response.data);
        console.log(listaGrup)
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
    

  
}, [])


 
  return (
    <><MenuBar/>
    <div className="container">
      <header className="jumbotron">
        <h3>
        Profile:  <strong>{currentUser.username}</strong> 
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
      <strong>Grupy:</strong>
      <ul>
       {typeof(listaGrup)!="undefined"  ? 
       listaGrup.map(val=> <li> {val.nazwa_grupa}</li>):
       <li> Brak</li>
      
      } 
      </ul>
    </div>
    </>
  );
};

export default Konto;



