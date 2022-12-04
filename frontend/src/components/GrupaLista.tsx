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
    const addGrupa = (formValue: GrupaData) => {
        GrupyService.create(formValue.nazwa_grupa).then((response: any) => {
            console.log("dodano:"+ formValue.nazwa_grupa)
            console.log(response.data)
            
        window.location.reload();
        }).catch((e: Error) => {
            console.log(e)
        })
    }
    const changeRow = (formValue: GrupaData) => {
        const confirmBox = window.confirm(
            "Czy zmienić nazwę grupy na:"+formValue.nazwa_grupa
          )
          if (confirmBox === true) {
            GrupyService.change_id(formValue.nazwa_grupa,formValue.id).then((response: any) => {
                window.alert('Zmieniono')
            console.log(response.data)
            
        window.location.reload();
        }).catch((e: Error) => {
            console.log(e)
        })
          }
    }
   
    const deleteRow = (id: number,nazwa_grupa:string) => {
        const confirmBox = window.confirm(
            "Czy usunąć grupę:"+nazwa_grupa
          )
          if (confirmBox === true) {
            GrupyService.delete_id(id).then((response: any) => {
                window.alert('Usuniento')
            console.log(response.data)
            
        window.location.reload();
        }).catch((e: Error) => {
            console.log(e)
        })
          }
        
    }
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

            <Formik
            enableReinitialize={true}
                initialValues={{
                    nazwa_grupa: '',
                    id: ''
                }}
                validationSchema={validationSchema}
                onSubmit={addGrupa}>
                <Form>
               
                    <div className="row p-2">

                        <Field type="hidden" id="id" name='id' />
                        <div className="col ">
                            <Field    type="text" id='nazwa_grupa' name='nazwa_grupa' className="form-control" placeholder="nazwa grupa" aria-label="nazwa_grupa" />

                        </div>
                        <div className="col container">
                            <div className=" btn-group d-flex justify-content-center">
                                <button className="btn btn-success  ">Dodaj grupę </button>
                            </div>
                        </div>

                    </div>

                </Form>
            </Formik>
          
            {grupy &&
                grupy.map((val, key) => (
                    <><hr /><Formik
                        initialValues={{
                            nazwa_grupa: val.nazwa_grupa,
                            id: val.id,
                            key: key
                        }}
                        validationSchema={validationSchema}
                        onSubmit={changeRow}>
                        <Form>
                            <div className="row p-2 pt-5" >

                                <div className="col ">
                                    <Field type="hidden" id="id" name='id' />
                                    {ZmienNazweid == val.id ? (
                                        
                                        <Field type="text" id='nazwa_grupa' name='nazwa_grupa' className="form-control" placeholder="nazwa grupa" aria-label="nazwa_grupa" />
                                        ) :
                                        (
                                            <p>{val.nazwa_grupa}</p>  
                                        )
                                        }


                                </div>
                                <div className="col ">
                                    <div className=" btn-group d-flex justify-content-center">
                                        {ZmienNazweid == val.id ? (
                                            <button className="btn btn-success p-1 " type="submit"  >Zaakceptuj </button>
                                           
                                        ) : (
                                            <button  type="button"  className="btn btn-warning p-1 " onClick={() => setZmienNazweid(val.id)}>Zmień nazwę </button>
                                        )}

                                        <button className="btn btn-danger p-1" type="submit" onClick={() => deleteRow(val.id,val.nazwa_grupa)}>Usuń grupę</button>
                                    </div>
                                </div>

                            </div>
                            <div className="row p-1">
                                <div className="container ml-5 mr-5 bg-light border">

                                    <div className="row mt-2">
                                        <div className="col">Użytkownik</div>
                                        <div className="col">Opcje</div>
                                    </div>
                                    <hr />
                                    <div className="row ">
                                        <div className="col">user1</div>
                                        <div className="col">
                                            <div className=" btn-group d-flex justify-content-center">
                                                <button className="btn btn-danger p-1">usuń </button></div></div>
                                    </div>
                                    <hr />
                                    <div className="row ">

                                    </div>
                                    <div className="row ">
                                        <div className="col">user1</div>
                                        <div className="col">
                                            <div className=" btn-group d-flex justify-content-center">
                                                <button className="btn btn-success p-1">Zakceptuj </button></div></div>
                                    </div>


                                </div>
                            </div>
                        </Form>
                    </Formik></>
                ))
            }


        </div>



    </>


    )
};

export default GrupaLista;
