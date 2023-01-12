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
 
  return (
    <>
    <Container><Row ><div className="input-group rounded mt-3">
  <input type="search" className="form-control rounded" placeholder="Wyszukaj" />
  <span className="input-group-text border-0">
    Wyszukaj
  </span>
</div>
      </Row>
      <hr></hr>
      <CardColumns>
      <Link
                   
                    to={
                      "/katalog/"
                    }
                  >
                    <Card>
                      <Card.Img
                        variant="top"
                        height="160px"
                        src={
                          "http://localhost:8000/api/CACHE/images/images/8756b894b223471f9d5338d6252ac668/beabb330940688f0582b8d33a6c5fe15.JPEG"                 
                        }
                      />
                      <Card.Body>
                        <Card.Title>test</Card.Title>
                      </Card.Body>
                    </Card>{" "}
                  </Link>
      </CardColumns>
      </Container>
    </>
  );
};

export default Wyszukaj;
