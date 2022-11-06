import React, { useState } from "react";
import { getCurrentUser } from "../services/auth.service";
import MenuBar from "./MenuBar";
import axios from "axios";
import TasksService from "../services/TaskService";
import authHeader from "../services/auth-header"
import Grupa from "../types/grupa";
import getGrupaall from "../services/GrupyService";
const API_URL = "http://localhost:8000/api/";


const Konto: React.FC = () => {
  const currentUser = getCurrentUser();
  let refresh : any = ""
  refresh = localStorage.getItem("refresh");
  let access = localStorage.getItem("access");
  
 
  const [listaGrup, setlistaGrup] = useState<Grupa>();
  console.log(getGrupaall)



 
console.log(currentUser)
  return (
    <><MenuBar/>
    <div className="container">
      <header className="jumbotron">
        <h3>
        Profile:  <strong>{currentUser.username}</strong> 
        </h3>
      </header>
     
    <p>{refresh}</p>  
       <strong>{access}</strong> 
      <p>
        <strong>Id:</strong> {currentUser.user_id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Grupy:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role: string, index: number) => <li key={index}>{role}</li>)}
      </ul>
    </div>
    </>
  );
};

export default Konto;



