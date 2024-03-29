import axios, { AxiosResponse } from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/";
async function getwybrany(id:number) {
  try {
    const grupy = axios.get(API_URL + "numer_katalogowy_wybrany/"+id, { headers: authHeader() })
    return grupy
  } catch (error) {
    
    throw new Error('błąd');
  }
  }
async function getall() {
  try {
    const grupy = axios.get(API_URL + "numer_katalogowy/", { headers: authHeader() })
    return grupy
  } catch (error) {
    
    throw new Error('błąd');
  }
  }
  async function get_id(id:number) {
    try {
      const grupy = axios.get(API_URL + "numer_katalogowy/"+id, { headers: authHeader() })
   
      return grupy
    } catch (error) {
      
      throw new Error('błąd');
    }
    }


    export const create = (numer_katalogowy_strona:string,opis_Numer_katalogowy:string,strona_katalog:number) => {

      return axios.post(API_URL + "numer_katalogowy/", {
        numer_katalogowy_strona,opis_Numer_katalogowy,strona_katalog
      }, { headers: authHeader() });


      
    };
    export const change_id = (nazwa_grupa:string,id:number) => {
      console.log(id+nazwa_grupa)
      return axios.put(API_URL + "numer_katalogowy/"+id, {id,
        nazwa_grupa,
      }, { headers: authHeader() });


      
    };

    export const delete_id = (id:number) => {

      return axios.delete(API_URL + "numer_katalogowy/"+id, { headers: authHeader() });


      
    };
    
  const Numer_katalogowyService = {
    getall,get_id,create,delete_id,change_id,getwybrany
  }
export default Numer_katalogowyService