import axios, { AxiosResponse } from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/";

async function getall() {
  try {
    const grupy = axios.get(API_URL + "numer_katalogowy_lista/", { headers: authHeader() })
    return grupy
  } catch (error) {
    
    throw new Error('błąd');
  }
  }
  async function get_id(id:number) {
    try {
      const grupy = axios.get(API_URL + "numer_katalogowy_lista/"+id, { headers: authHeader() })
   
      return grupy
    } catch (error) {
      
      throw new Error('błąd');
    }
    }
    async function get_wybrany(id:number) {
      try {
        const grupy = axios.get(API_URL + "numer_katalogowy_lista_wybrany/"+id, { headers: authHeader() })
     
        return grupy
      } catch (error) {
        
        throw new Error('błąd');
      }
      }


    export const create = (numer_katalogowy:number,lista:number,liczba:number) => {

      return axios.post(API_URL + "numer_katalogowy_lista/", {
        numer_katalogowy,lista,liczba,
      }, { headers: authHeader() });


      
    };
    export const change_id = (nazwa_grupa:string,id:number) => {
      console.log(id+nazwa_grupa)
      return axios.put(API_URL + "numer_katalogowy_lista/"+id, {id,
        nazwa_grupa,
      }, { headers: authHeader() });


      
    };

    export const delete_id = (id:number) => {

      return axios.delete(API_URL + "numer_katalogowy_lista/"+id, { headers: authHeader() });


      
    };
    
  const numer_katalogowy_ListaService = {
    getall,get_id,create,delete_id,change_id,get_wybrany
  }
export default numer_katalogowy_ListaService