import axios, { AxiosResponse } from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/";

async function getwybrany(id:number) {
  try {
    const grupy = axios.get(API_URL + "numer_katalogowy_czesc_wybrany/"+id, { headers: authHeader() })
 
    return grupy
  } catch (error) {
    console.log("alaasd")
    throw new Error('błąd');
  }
  }
async function getall() {
  try {
    const grupy = axios.get(API_URL + "numer_katalogowy_czesc/", { headers: authHeader() })
    return grupy
  } catch (error) {
    console.log("alaasd")
    throw new Error('błąd');
  }
  }
  async function get_id(id:number) {
    try {
      const grupy = axios.get(API_URL + "numer_katalogowy_czesc/"+id, { headers: authHeader() })
   
      return grupy
    } catch (error) {
      console.log("alaasd")
      throw new Error('błąd');
    }
    }


    export const create = (opis_Numer_katalogowy_Czesc:string,numer_katalogowy:number,czesc:number,liczba_Numer_katalogowy_Czesc:number) => {
console.log('numer_katalogowy_czesc')
      return axios.post(API_URL + "numer_katalogowy_czesc/", {
        opis_Numer_katalogowy_Czesc,numer_katalogowy,czesc,liczba_Numer_katalogowy_Czesc
      }, { headers: authHeader() });


      
    };
    export const change_id = (nazwa_grupa:string,id:number) => {
      console.log(id+nazwa_grupa)
      return axios.put(API_URL + "numer_katalogowy_czesc/"+id, {id,
        nazwa_grupa,
      }, { headers: authHeader() });


      
    };

    export const delete_id = (id:number) => {

      return axios.delete(API_URL + "numer_katalogowy/"+id, { headers: authHeader() });


      
    };
    
  const Numer_katalogowy_czescService = {
    getall,get_id,create,delete_id,change_id,getwybrany
  }
export default Numer_katalogowy_czescService