import axios, { AxiosResponse } from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/";
async function getall() {
  try {
    const grupy = axios.get(API_URL + "zdjecie/", { headers: authHeader() })
    return grupy
  } catch (error) {
    
    throw new Error('błąd');
  }
  }

  async function get_id(id:number) {
    try {
      const grupy = axios.get(API_URL + "zdjecie/"+id, { headers: authHeader() })
   
      return grupy
    } catch (error) {
      
      throw new Error('błąd');
    }
    }


    export const create = (image:File,opis_zdjecie:string) => {
      const access = localStorage.getItem("access");
      // let image=zdjecie
      console.log(image)
    if (access) {
      let user = null;
      user = JSON.parse(access);
       ;
      console.log(image)
      return axios.post(API_URL + "zdjecie/", {
        image,opis_zdjecie
      }, { headers: { "Content-Type": "multipart/form-data",Authorization: 'Bearer ' + user ,} });


    }else{
      throw new Error('brak user'); }
    };
    export const change_id = (nazwa_grupa:string,id:number) => {
      console.log(id+nazwa_grupa)
      return axios.put(API_URL + "zdjecie/"+id, {id,
        nazwa_grupa,
      }, { headers: authHeader() });


      
    };

    export const delete_id = (id:number) => {

      return axios.delete(API_URL + "zdjecie/"+id, { headers: authHeader() });


      
    };

  const ZdjecieService = {
    getall,get_id,create,delete_id,change_id
  }
export default ZdjecieService