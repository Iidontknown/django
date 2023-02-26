import axios, { AxiosResponse } from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/";

async function getall() {
  try {
    const grupy = axios.get(API_URL + "grupauser/", { headers: authHeader() })
    return grupy
  } catch (error) {
    
    throw new Error('błąd');
  }
  }
  async function get_id(id:number) {
    try {
      const grupy = axios.get(API_URL + "grupauser/"+id, { headers: authHeader() })
   
      return grupy
    } catch (error) {
      
      throw new Error('błąd');
    }
    }
    async function get_wybrany_id(id:number) {
      try {
        const grupy = axios.get(API_URL + "grupausergrupa_wybrany/"+id, { headers: authHeader() })
     
        return grupy
      } catch (error) {
        
        throw new Error('błąd');
      }
      }


    export const create = (grupa:number) => {

      return axios.post(API_URL + "grupauser/", {
        grupa,
      }, { headers: authHeader() });


      
    };
    export const change_id = (allow:boolean,id:number) => {
      return axios.put(API_URL + "grupauser/"+id, {id,
        allow,
      }, { headers: authHeader() });


      
    };

    export const delete_id = (id:number) => {

      return axios.delete(API_URL + "grupauser/"+id, { headers: authHeader() });


      
    };

  const GrupaUserService = {
    getall,get_id,create,delete_id,change_id,get_wybrany_id
  }
export default GrupaUserService