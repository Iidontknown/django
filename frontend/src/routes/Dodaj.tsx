import * as React from 'react';
import { useEffect } from 'react';
import { Row, Form, Col, Button } from 'react-bootstrap';
import ProducentService from '../services/ProducentService';
import ProducentData from '../types/producent';
import Select, { ActionMeta } from "react-select";

const Dodaj: React.FC = () => {
  
  const [listaProducent, setlistaProducent] = React.useState<Array<ProducentData>>([]);

  useEffect(() => {
    ProducentService.getall().then(
        (response) => {
          try {
            setlistaProducent(response.data);
            console.log(response.data)
          } catch (error) {
            console.log("błąd axios"+error)
          }
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
              console.log(error);
              
        }
      );
  }, [])



  return (
    <> 
    <div className="container">
    <div className="p-2">
    <Row>
    <Form.Label column lg={2}>
      Producent
    </Form.Label>
    <Col>
    {/* <Select {...props} theme={(theme) => ({ ...theme, borderRadius: 0 })} /> */}
    <Select<ProducentData>
        // value={listaProducent}
        getOptionLabel={(producent: ProducentData) => producent.nazwa_producent}
        getOptionValue={(producent: ProducentData) => producent.id.toString()}
        options={listaProducent}
        isClearable={true}
        backspaceRemovesValue={true}
        // onChange={onChange}
      />
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
  )
}
export default Dodaj