import * as React from 'react';
import { useEffect } from 'react';
import { Row, Form, Col, Button, } from 'react-bootstrap';
import ProducentService from '../../services/ProducentService';
import ProducentData from '../../types/producent';
import Select, { SingleValue } from "react-select";
import ModellData from '../../types/modell';


const Dodaj: React.FC = () => {
  
  const [listaProducent, setlistaProducent] = React.useState<Array<ProducentData>>([]);
  const [listaModel, setlistaModell] = React.useState<Array<ModellData>>([]);
  const [selectProducentid, setselectProducentid] = React.useState<number|null>(null);

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

  const SelectProducentOnchange = (selected: SingleValue<ProducentData>) => {
    if(selected !=null){
  
      setselectProducentid(selected.id);
    }else{
      
    setselectProducentid(null)
    }
  };
  const SelectModelOnchange = (selected: SingleValue<ModellData>) => {
    if(selected !=null){
  
      setselectProducentid(selected.id);
    }else{
      
    setselectProducentid(null)
    }
  };

  return (
    <> 
    <Form>
    <div className="container">
    <div className="p-2">
    <Row>
    <Form.Label column lg={2}>
      Producent
    </Form.Label>
    <Col>
    <Select<ProducentData>
        getOptionLabel={(producent: ProducentData) => producent.nazwa_producent}
        getOptionValue={(producent: ProducentData) => producent.id.toString()}
        options={listaProducent}
        isClearable={true}
        backspaceRemovesValue={true}
        placeholder='Podaj nazwę producenta'
      onChange={SelectProducentOnchange}
      />
    </Col>
  </Row>
  <br />
  <Row>
    <Form.Label column lg={2}>
      model
    </Form.Label>
    <Col>
    <Select<ModellData>
        getOptionLabel={(producent: ModellData) => producent.nazwa_model}
        getOptionValue={(producent: ModellData) => producent.id.toString()}
        options={listaModel}
        isClearable={true}
        backspaceRemovesValue={true}
        placeholder='Podaj nazwę model'
      onChange={SelectModelOnchange}
      />
    </Col>
  </Row>
  <br />

  <Row>
    
    <Col>
    <div className="input-group mb-3">
  <div className="input-group-prepend">
    <div className="input-group-text">
      <input type="checkbox"/>
    </div>
  </div>
  <input type="disable" className="form-control" aria-label="Text input with checkbox" placeholder='Zaznacz aby katalog był publiczny' />
</div>
   
    </Col>
  </Row>
  <br />

  </div>
  <Row>
    <Col>
  <Button variant="primary" size="lg">
   Dalej
  </Button></Col> </Row>
  </div></Form>
    </>
  )
}
export default Dodaj