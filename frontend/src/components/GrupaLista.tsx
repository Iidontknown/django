
import React, { useState, useEffect, ChangeEvent } from "react";
import GrupaData from './../types/grupa';

import Grupaadd from "./Grupaadd";
import GrupachangeDelate from './GrupachangeDelate';
const GrupaLista: React.FC =  () => {
    const [grupy, setGrupy] = useState<Array<GrupaData>>([]);
    

 
  


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
