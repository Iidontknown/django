import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../services/auth.service";
import MenuBar from "./MenuBar";
import getGrupaall from "../services/GrupyService";
import GrupaData from "./../types/grupa";
import GrupyService from "../services/GrupyService";
import { Link } from "react-router-dom";
import KatalogService from "../services/KatalogService";
import KatalogData from "../types/katalog";
import { Card, Container, Form, InputGroup } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { CardColumns } from "reactstrap";
const API_URL = "http://localhost:8000/api/";

const Wyszukaj: React.FC = () => {

  const [katalogi, setKatalogi] = React.useState<Array<KatalogData>>([]);
  const [wyszukajinput, setwyszukajinput] = React.useState<string>('');
  React.useEffect(() => {
    getallkatalog();
  }, []);

  const getallkatalog = () => {
    KatalogService.getall()
      .then((response: any) => {
        setKatalogi(response.data);
        
        console.log(response);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const wyszukajonchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setwyszukajinput(value)
  }

  

  return (
    <>
    <Container><Row ><div className="input-group rounded mt-3">
  <input type="search" className="form-control rounded" placeholder="Wyszukaj" value={wyszukajinput} onChange={wyszukajonchange}/>
 
</div>
      </Row>
      <hr></hr>
      <CardColumns>
      {katalogi.filter((filterval)=>filterval.nazwa_katalog.toLowerCase().includes(wyszukajinput.toLowerCase())).length > 0 ? (
            katalogi.filter((filterval)=>filterval.nazwa_katalog.toLowerCase().includes(wyszukajinput.toLowerCase())).map((val, key) => (
              <>
              <Link
                   
                    to={
                      "/katalog/"+val.id
                    }
                  >
                    <Card>
                      <Card.Img
                        variant="top"
                        height="160px"
                        src={
                          "http://localhost:8000/api/" +
                          val.image_Thumbnails
                        }
                      />
                      <Card.Body>
                        <Card.Title>{val.nazwa_katalog}</Card.Title>
                      </Card.Body>
                    </Card>{" "}
                  </Link>
                  </>
            ))
          ) : (
            <h1>Brak</h1>
          )}
      </CardColumns>
      </Container>
    </>
  );
};

export default Wyszukaj;
