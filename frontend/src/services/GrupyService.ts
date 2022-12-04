import axios, { AxiosResponse } from "axios";
import Grupa from "../types/grupa";
import authHeader from "./auth-header";
import GrupaData from './../types/grupa';

const API_URL = "http://localhost:8000/api/";

async function getGrupaall() {
  try {
    const grupy = axios.get("http://localhost:8000/api/grupa/", { headers: authHeader() })
    return grupy
  } catch (error) {
    console.log("alaasd")
    throw new Error('błąd');
  }
  }
  async function getGrupa(id:number) {
    try {
      const grupy = axios.get("http://localhost:8000/api/grupa/"+id, { headers: authHeader() })
   
      return grupy
    } catch (error) {
      console.log("alaasd")
      throw new Error('błąd');
    }
    }


    export const create = (nazwa_grupa:string) => {

      return axios.post(API_URL + "grupa/", {
        nazwa_grupa,
      }, { headers: authHeader() });


      
    };
    export const change_id = (nazwa_grupa:string,id:number) => {

      return axios.put(API_URL + "grupa/", {id,
        nazwa_grupa,
      }, { headers: authHeader() });


      
    };

    export const delete_id = (id:number) => {

      return axios.delete(API_URL + "grupa/"+id, { headers: authHeader() });


      
    };

  const GrupyService = {
    getGrupaall,getGrupa,create,delete_id,change_id
  }
export default GrupyService