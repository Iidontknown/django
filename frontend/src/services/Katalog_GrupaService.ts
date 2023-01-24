import axios, { AxiosResponse } from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/";

async function getall() {
  try {
    const grupy = axios.get(API_URL + "katalog_grupa/", { headers: authHeader() })
    return grupy
  } catch (error) {
    console.log("alaasd")
    throw new Error('błąd');
  }
  }
  async function get_id(id:number) {
    try {
      const grupy = axios.get(API_URL + "katalog_grupa/"+id, { headers: authHeader() })
   
      return grupy
    } catch (error) {
      console.log("alaasd")
      throw new Error('błąd');
    }
    }
    async function get_katalog(id:number) {
      try {
        const grupy = axios.get(API_URL + "katalog_grupa_katalog/"+id, { headers: authHeader() })
     
        return grupy
      } catch (error) {
        console.log("alaasd")
        throw new Error('błąd');
      }
      }
      
      async function get_grupa(id:number) {
        try {
          const grupy = axios.get(API_URL + "katalog_grupa_grupa/"+id, { headers: authHeader() })
       
          return grupy
        } catch (error) {
          console.log("alaasd")
          throw new Error('błąd');
        }
        }


    export const create = (grupa:number,katalog:number) => {

      return axios.post(API_URL + "katalog_grupa/", {
        grupa,katalog
      }, { headers: authHeader() });


      
    };
    export const change_id = (nazwa_grupa:string,id:number) => {
      console.log(id+nazwa_grupa)
      return axios.put(API_URL + "katalog_grupa/"+id, {id,
        nazwa_grupa,
      }, { headers: authHeader() });


      
    };

    export const delete_id = (id:number) => {

      return axios.delete(API_URL + "katalog_grupa/"+id, { headers: authHeader() });


      
    };
    
  const Katalog_GrupaService = {
    getall,get_id,create,delete_id,change_id,get_katalog,get_grupa
  }
export default Katalog_GrupaService