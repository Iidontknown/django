import axios from "axios";
import Grupa from "../types/grupa";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/";

async function getGrupaall() {
    const grupy = axios.get("http://localhost:8000/api/grupa/", { headers: authHeader() })
   
    // console.log(grupy)
    return grupy
  }
export default getGrupaall