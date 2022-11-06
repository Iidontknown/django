import React from "react";
import { getCurrentUser } from "../services/auth.service";
import { logout } from './../services/auth.service';

import { NavigateFunction, useNavigate } from 'react-router-dom';

const LogOut: React.FC = () => {
let navigate: NavigateFunction = useNavigate();
logout()
navigate("/konto");
        window.location.reload();
  return (
    <>
    <h1>Wylogowanmie</h1>
    
    </>
  );
};

export default LogOut;

