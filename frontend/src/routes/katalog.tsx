import * as React from "react";
import { Card, Button, CardGroup, Container, Col, Figure } from "react-bootstrap";
import { Link } from "react-router-dom";
import KatalogData from "../types/katalog";
import KatalogService from "../services/KatalogService";
export default function Katalog(): JSX.Element {
  const [Katalogi, setKatalogi] = React.useState<Array<KatalogData>>([]);
  React.useEffect(() => {
    getallkatalog();
  }, []);
  const getallkatalog = () => {
    KatalogService.getall_user()
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
                <Link to={`/katalog/${val.id}`}>
                  <Col>
                    <Card>
                      <Card.Img
                        variant="top"
                        src={
                          "http://localhost:8000/api/" +
                          val.image_Thumbnails
                        }
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
