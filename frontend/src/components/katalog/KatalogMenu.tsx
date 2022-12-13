import * as React from 'react';
import { useEffect } from 'react';
import { Row, Form, Col, Button, Card, Container, } from 'react-bootstrap';
import ProducentService from '../../services/ProducentService';
import ProducentData from '../../types/producent';
import Select, { SingleValue } from "react-select";
import ModellData from '../../types/modell';
import { CardColumns } from 'reactstrap';


const KatalogMenu: React.FC = () => {
 

  return (
    <> 
    <Container className='pt-1'>
    <div className=" text-center">
    <h1 className="display-4">Deutz fahr 4075/4080/4090 -/h/hts </h1>
    <p >Własiciel: Admin</p>
  </div>
  <hr/>
     <CardColumns>
    
     <Card>
    <Card.Img variant="top" height='160px' src="https://cdn.shopify.com/s/files/1/2222/6299/products/deutz1_245438b8-6fbf-4aef-955d-5c212c946e5a_1024x1024@2x.jpg?v=1527328553" />
    <Card.Body>
      <Card.Title>kverneland pb 1xx 2001-2019</Card.Title>
      <div className="text-right">1</div>
    </Card.Body>
  </Card> 
  <Card>
    <Card.Img variant="top" height='160px' src="https://cdn.shopify.com/s/files/1/2222/6299/products/deutz2_a89ea526-f40e-45c6-a2c8-ee3162ad49ac_800x.jpg?v=1527328553" />
    <Card.Body>
      <Card.Title>kverneland pb 1xx 2001-2019</Card.Title>
      <div className="text-right">2</div>
    </Card.Body>
  </Card>  
  <Card>
    <Card.Img variant="top" height='160px' src="https://image.slidesharecdn.com/deutzfahragrotron150tractorpartscataloguemanual-201227154807/85/deutz-fahr-agrotron-150-tractor-parts-catalogue-manual-14-320.jpg?cb=1668700405" />
    <Card.Body>
      <Card.Title>kverneland pb 1xx 2001-2019</Card.Title>
      <div className="text-right">3</div>
    </Card.Body>
  </Card> 
</CardColumns>
</Container>
    </>
  )
}
export default KatalogMenu