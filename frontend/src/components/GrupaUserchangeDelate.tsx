import React, { useEffect, ChangeEvent, useState } from "react";
import GrupaUserService from "../services/GrupaUserService";
import GrupaData from "../types/grupa";
import UserGrupa from "../types/usergrupa";


function GrupaUserchangeDelate({ id}: GrupaData) {

  const [grupy, setGrupy] = useState<Array<UserGrupa>>([]);
  useEffect(() => {
    getallgrupa();
  }, []);

  const getallgrupa = () => {
    GrupaUserService.getall()
      .then((response: any) => {
        setGrupy(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  return (
    <>
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
                <button className="btn btn-danger p-1">usuń </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="row "></div>
          <div className="row ">
            <div className="col">user1</div>
            <div className="col">
              <div className=" btn-group d-flex justify-content-center">
                <button className="btn btn-success p-1">Zakceptuj </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default GrupaUserchangeDelate;
