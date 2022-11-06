
import React from "react"

import {Navigate, Outlet} from "react-router-dom"
import { getCurrentUser } from "../services/auth.service";

const userAuth = () =>{
    const currentUser = getCurrentUser();
    if (currentUser){
        return true
    }
    return false
}
const ProtectedRoutes = () => {
	const auth = userAuth()

	if (auth) {
		return <Outlet />
	} else {
		return <Navigate to="/login" />
	}
}
export default  ProtectedRoutes