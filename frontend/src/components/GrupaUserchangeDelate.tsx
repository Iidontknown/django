import React, { useEffect, ChangeEvent, useState } from "react";
import GrupaUserService from "../services/GrupaUserService";
import GrupaData from "../types/grupa";
import GrupaUserData from "../types/grupauser";
import { Row } from "react-bootstrap";


function GrupaUserchangeDelate( val : GrupaData ) {
console.log(val)

const [grupaUser, setgrupaUser] = useState<Array<GrupaUserData>>([]);
const [reload, setreload] = useState<boolean>(false);
  useEffect(() => {
    getallgrupauser(val.id);
  }, [reload]);

  const getallgrupauser = (id:number) => {
    GrupaUserService.get_wybrany_id(id)
      .then((response: any) => {
        setgrupaUser(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const deletegrupauser = (id:number) => {
    GrupaUserService.delete_id(id)
      .then((response: any) => {
        console.log(response.data);
        setreload(!reload)
        window.alert("Usuniento");
      })
      .catch((e: Error) => {
        console.log(e);
        window.alert(e);
      });
  };
  const putgrupauser = (id:number,allow:boolean) => {
    GrupaUserService.change_id(allow,id)
      .then((response: any) => {
        console.log(response.data);
        
        setreload(!reload)
        window.alert("Zakcepnowano");
      })
      .catch((e: Error) => {
        console.log(e);
        window.alert(e);
      });
  };
  return (
    <>
     <div className="row p-1">
      
    
      {grupaUser.length !=0?(
        <> <div className="container ml-5 mr-5 bg-light border">
        <div className="row mt-2">
          <div className="col">Użytkownik </div>
          <div className="col">Opcje</div>
        </div>
        {grupaUser.length !=0
        &&grupaUser.map((val, key) => (
          <>
          <hr />
          <div className="row ">
          <div className="col">{val.user_name}</div>
          <div className="col">
            <div className=" btn-group d-flex justify-content-center">
              {val.allow?(<>
              <button className="btn btn-danger p-1" onClick={() => deletegrupauser(val.id)}>usuń </button></>):(<>
              <button className="btn btn-success p-1"onClick={() => putgrupauser(val.id,true)} >Zakceptuj </button>
              </>)}
            </div>
          </div>
        </div>
          </>

        ))}

        
        
      </div></>
      ):(
        <><div className="container ml-5 mr-5 bg-light border">Brak user</div></>
      )}
       
      </div>
    </>
  );
}
export default GrupaUserchangeDelate;
