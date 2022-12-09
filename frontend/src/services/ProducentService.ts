import axios, { AxiosResponse } from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/";

async function getall() {
  try {
    const grupy = axios.get(API_URL + "producent/", { headers: authHeader() })
    return grupy
  } catch (error) {
    console.log("alaasd")
    throw new Error('błąd');
  }
  }
  async function get_id(id:number) {
    try {
      const grupy = axios.get(API_URL + "producent/"+id, { headers: authHeader() })
   
      return grupy
    } catch (error) {
      console.log("alaasd")
      throw new Error('błąd');
    }
    }


    export const create = (nazwa_grupa:string) => {

      return axios.post(API_URL + "producent/", {
        nazwa_grupa,
      }, { headers: authHeader() });


      
    };
    export const change_id = (nazwa_grupa:string,id:number) => {
      console.log(id+nazwa_grupa)
      return axios.put(API_URL + "producent/"+id, {id,
        nazwa_grupa,
      }, { headers: authHeader() });


      
    };

    export const delete_id = (id:number) => {

      return axios.delete(API_URL + "producent/"+id, { headers: authHeader() });


      
    };

  const ProducentService = {
    getall,get_id,create,delete_id,change_id
  }
export default ProducentService