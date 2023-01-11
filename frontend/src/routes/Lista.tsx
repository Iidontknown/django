import * as React from "react";
import { Card, Button, CardGroup, Container, Col, Figure } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CardColumns } from "reactstrap";
import MenuBar from "./MenuBar";
import KatalogData from "./../types/katalog";
import GrupyService from "../services/GrupyService";
import KatalogService from "../services/KatalogService";
import ModellService from "../services/ModellService";
import ModellData from './../types/modell';
import ProducentService from "../services/ProducentService";
import ProducentData from './../types/producent';
export default function Lista(): JSX.Element {
  const [Katalogi, setKatalogi] = React.useState<Array<KatalogData>>([]);
  const [Modelle, setModelle] = React.useState<Array<ModellData>>([]);
  const [Producent, setProducent] = React.useState<Array<ProducentData>>([]);
  React.useEffect(() => {
    getallkatalog();
  }, []);
  const getallkatalog = () => {
    KatalogService.getall()
      .then((response: any) => {
        setKatalogi(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  
  return (
    <>
      <Container>
     <h1 className="mt-4">Twoje Katalogi</h1>
     <hr/>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
          {Katalogi.length != 0 ? (
            Katalogi.map((val, key) => (
              <>
                {/* { temp='/katalog/'+{val.id}} */}
                <Link to={`/katalog/${val.id}`}>
                  <Col>
                    <Card>
                      <Card.Img
                        variant="top"
                        src="https://engine.od.ua/imgl/img_6140_1.jpg"
                      />
                      <Card.Body>
                        <Card.Title>{val.nazwa_katalog}</Card.Title>
                      </Card.Body>
                    </Card>{" "}
                  </Col>
                </Link>
              </>
            ))
          ) : (
            <h1>Brak</h1>
          )}
        </div>
      </Container>
    </>
  );
}
