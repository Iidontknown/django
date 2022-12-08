import * as React from 'react';
import { Row, Form, Col, Button } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import MenuBar from './MenuBar';
export default function Dodaj():JSX.Element  {
  return (
    <> 
    <>
    <div className="container">
    <div className="p-2">
    <Row>
    <Form.Label column lg={2}>
      Producent
    </Form.Label>
    <Col>
      <Form.Control type="text" placeholder="Podaj nazwę producenta" />
    </Col>
  </Row>
  <br />
  <Row>
    <Form.Label column lg={2}>
      model
    </Form.Label>
    <Col>
      <Form.Control type="text" placeholder="Podaj model" />
    </Col>
  </Row>
  <br />
  <Row>
    <Form.Label column lg={2}>
      rok wydania katalogu
    </Form.Label>
    <Col>
      <Form.Control type="text" placeholder="Podaj rok " />
    </Col>
  </Row>
  <br />
  <Row>
    
    <Col>
    <Form.Check 
    type="switch"
    label="publiczne"
  />
    </Col>
  </Row>
  <br />
  <Row >
  <Form.Group controlId="formFile" className="mb-3">
    <Form.Control type="file" />
  </Form.Group>
  </Row>
  </div>
  <Button variant="primary" size="lg">
   Dalej
  </Button>
  </div>
</>
    </>
  )
}