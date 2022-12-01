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
    async function create(data:GrupaData) {
      try {
        const temp = {'nazwa_grupa':data.nazwa_grupa,}
        const grupy = axios.post("http://localhost:8000/api/grupa/",{data}, { headers: authHeader() })
        console.log(grupy)
        return grupy
      } catch (error) {
        console.log("alaasd")
        throw new Error('błąd');
      }
      }


  const GrupyService = {
    getGrupaall,getGrupa,create
  }
export default GrupyService