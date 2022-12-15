import * as React from "react";
import { useEffect } from "react";
import { Row, Form, Col, Button, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const StronaKatalog: React.FC = () => {
  return (
    <>
      <Container className="w-100 mh-100 p-20">
        <Row>
          <Col className="w-50 mh-100">
            <Image width={540} src="test.PNG"></Image>
          </Col>
          <Col className="w-50 mh-100 ">
            <div className="overflow-scroll">
              {" "}
              <div className="p-2">
                <Link to="/katalog">
                  PrzykladowyProducent {">"}PrzykladowyModel {">"} Przykladowy
                  Katalog
                </Link>
              </div>
              <Row className="d-flex justify-content-between border-top p-2">
                <Button>{"<"}</Button>
                <p>Przykładowa Strona</p>
                <Button>{">"}</Button>
              </Row>
              <div>
              <Row className="border p-1  mt-2 d-flex flex-row">
                  <div className="w-100">
                    1-test
                    <br />
                    Opis: Brak
                    <br/>
                    Numer katalogowy: 312312
                    <br />
                    Numery pasujących cześci:
                    <br />
                    <ul>
                      <li>m1234xszc - Przykładowy producent </li>
                      <li>43565l - Przykładowy producent2 </li>
                    </ul>
                  </div>
                  <div className="w-100 btn-group d-flex justify-content-center">
                    <Button className="btn btn-success d-flex ">
                      Dodaj do listy{" "}
                    </Button>
                  </div>
                </Row>
                <Row className="border p-1  mt-2 d-flex flex-row">
                  <div className="w-100">
                    2-Lorem
                    <br />
                    Opis: Przykładowy opis
                    <br />
                    Numer katalogowy: 12345
                    <br />
                    Numery pasujących cześci:
                    <br />
                    <ul>
                      <li>5432 - Przykładowy producent </li>
                    </ul>
                  </div>
                  <div className="w-100 btn-group d-flex justify-content-center">
                    <Button className="btn btn-success d-flex ">
                      Dodaj do listy{" "}
                    </Button>
                  </div>
                </Row>
        


              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default StronaKatalog;
