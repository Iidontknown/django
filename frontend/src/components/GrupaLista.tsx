import { Field, Form, Formik, FormikProps, useFormikContext } from "formik";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import GrupaData from './../types/grupa';

import authHeader from '../services/auth-header';
import * as Yup from "yup";
import GrupyService from "../services/GrupyService";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotificationCenter from "./Popup";
import Grupaadd from "./Grupaadd";
import GrupachangeDelate from './GrupachangeDelate';
const GrupaLista: React.FC =  () => {
    const [grupy, setGrupy] = useState<Array<GrupaData>>([]);
    const [AktualnaGrupa, setAktualnaGrupa] = useState<GrupaData | null>(null);
    const [AktualnyId, setAktualnyId] = useState<number>(-1);
    const [nazwa_grupa_dod, setnazwa_grupa_dod] = useState<string>("");
    const [ZmienNazweid, setZmienNazweid] = useState<number>();

    const notify = () => toast("Wow so easy !");
    useEffect(() => {
        getallgrupa();
    }, []);

    const validationSchema = Yup.object().shape({
        nazwa_grupa: Yup.string()
            .test(
                "len",
                "Nazwa Grupa > 3 < 25",
                (val: any) =>
                    val &&
                    val.toString().length >= 3 &&
                    val.toString().length <= 25
            )
    });
 
   
    // const handle = (formValue: GrupaData) => {
     
    // }

    const getallgrupa = () => {
        
        GrupyService.getGrupaall().then((response: any) => {
            setGrupy(response.data)
            console.log(response.data)
            
        }).catch((e: Error) => {
            console.log(e)
        })




    }


    return (<>
        <div className="container bg-light ">
            
      
<hr />
            <h1>grupy</h1>
            <hr />
            <div className="row p-2">
                <div className="col">
                    nazwa Grupy
                </div>
                <div className="col">
                    Opcje
                </div>
            </div>
<Grupaadd/>
          
        
            {grupy &&
                grupy.map((val, key) => (
                    <><hr />
                    <GrupachangeDelate {...val} ></GrupachangeDelate>
                    </>
                ))
            } 



</div>

    </>


    )
};

export default GrupaLista;
