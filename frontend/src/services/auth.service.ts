import axios from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { useRef, useEffect } from "react";
const API_URL = "http://127.0.0.1:8000/api/";

export const register = (username: string, email: string, password: string) => {
  return axios.post(API_URL + "register/", {
    username,
    email,
    password,
  });
};

export const login = (username: string, password: string) => {
  return axios
    .post(API_URL + "token/", {
      username,
      password,
    })
    .then((response) => {
      console.log(JSON.stringify(response.data))
      if (response.data.access) {
        localStorage.setItem("user", JSON.stringify( jwtDecode<{email:string,user_id:number,username:string}>(response.data.access)));
        localStorage.setItem("access", JSON.stringify( response.data.access));
        localStorage.setItem("refresh", JSON.stringify( response.data.refresh));
      }

      return response.data;
    });
};

export const refreshToken = () => {
   let temp=localStorage.getItem("refresh")
  if(typeof(temp)!="string"){
    logout()
    return
  }
  let refresh=JSON.parse(temp)
  console.log(refresh)
  return axios
    .post(API_URL + "token/refresh/", {
      refresh,
    })
    .then((response) => {
      console.log(JSON.stringify(response.data))
      if (response.data.access) {
        localStorage.setItem("user", JSON.stringify( jwtDecode<{email:string,user_id:number,username:string}>(response.data.access)));
        localStorage.setItem("access", JSON.stringify( response.data.access));
        localStorage.setItem("refresh", JSON.stringify( response.data.refresh));
      }else{
        logout()
      }

      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);

  return null;
};


const timer: ReturnType<typeof setInterval> = setInterval(() => {
refreshToken()
}, 40000);
