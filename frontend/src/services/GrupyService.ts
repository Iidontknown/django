import axios, { AxiosResponse } from "axios";
import Grupa from "../types/grupa";
import authHeader from "./auth-header";
import GrupaData from './../types/grupa';

const API_URL = "http://localhost:8000/api/";

async function get() {
  try {
    const grupy = axios.get("http://localhost:8000/api/grupa/", { headers: authHeader() })
    return grupy
  } catch (error) {
    
    throw new Error('błąd');
  }
  }
  async function getall() {
    try {
      const grupy = axios.get("http://localhost:8000/api/grupaall/", { headers: authHeader() })
      return grupy
    } catch (error) {
      
      throw new Error('błąd');
    }
    }
  async function getGrupa(id:number) {
    try {
      const grupy = axios.get("http://localhost:8000/api/grupa/"+id, { headers: authHeader() })
   
      return grupy
    } catch (error) {
      
      throw new Error('błąd');
    }
    }
    async function get_katalogwherekataloggrupa(id:number) {
      try {
        const grupy = axios.get(API_URL + "grupawherekatalog_grupa/"+id, { headers: authHeader() })
     
        return grupy
      } catch (error) {
        
        throw new Error('błąd');
      }
      }

    export const create = (nazwa_grupa:string) => {

      return axios.post(API_URL + "grupa/", {
        nazwa_grupa,
      }, { headers: authHeader() });


      
    };
    export const change_id = (nazwa_grupa:string,id:number) => {
      console.log(id+nazwa_grupa)
      return axios.put(API_URL + "grupa/"+id, {id,
        nazwa_grupa,
      }, { headers: authHeader() });


      
    };

    export const delete_id = (id:number) => {

      return axios.delete(API_URL + "grupa/"+id, { headers: authHeader() });


      
    };

  const GrupyService = {
    get,getGrupa,create,delete_id,change_id,getall,get_katalogwherekataloggrupa
  }
export default GrupyService