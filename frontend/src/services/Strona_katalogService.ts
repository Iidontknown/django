import axios, { AxiosResponse } from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/";
async function getall() {
  try {
    const grupy = axios.get(API_URL + "strona_katalog/", { headers: authHeader() })
    return grupy
  } catch (error) {
    
    throw new Error('błąd');
  }
  }

  async function getwybranyKatalog(id:number) {
    try {
      const grupy = axios.get(API_URL + "strona_katalog_wybrany/"+id, { headers: authHeader() })
      return grupy
    } catch (error) {
      
      throw new Error('błąd');
    }
    }
  async function get_id(id:number) {
    try {
      const grupy = axios.get(API_URL + "strona_katalog/"+id, { headers: authHeader() })
   
      return grupy
    } catch (error) {
      
      throw new Error('błąd');
    }
    }


    export const create = (katalog_nadrzedny:number,numer_strony:number,nazwa_strony:string,zdjecie_strona_katalog:number) => {

      return axios.post(API_URL + "strona_katalog/", {
        katalog_nadrzedny,numer_strony,nazwa_strony,zdjecie_strona_katalog
      }, { headers: authHeader() });


      
    };
    export const change_id = (nazwa_grupa:string,id:number) => {
      console.log(id+nazwa_grupa)
      return axios.put(API_URL + "strona_katalog/"+id, {id,
        nazwa_grupa,
      }, { headers: authHeader() });


      
    };

    export const delete_id = (id:number) => {

      return axios.delete(API_URL + "strona_katalog/"+id, { headers: authHeader() });


      
    };

  const Strona_katalogService = {
    getall,get_id,create,delete_id,change_id,getwybranyKatalog
  }
export default Strona_katalogService