import * as React from 'react';
import { useEffect } from 'react';
import { Row, Form, Col, Button, Card, Container, } from 'react-bootstrap';
import ProducentService from '../../services/ProducentService';
import ProducentData from '../../types/producent';
import Select, { SingleValue } from "react-select";
import ModellData from '../../types/modell';
import { CardColumns } from 'reactstrap';


const Manage: React.FC = () => {
 

  return (
    <> 
    <Container className='pt-1'>
    <div className=" text-center">
    <h1 className="display-4">Twoje katalogi</h1>
    <p >Możesz zarządzać nimi</p>
  </div>
  <hr/>
     <CardColumns>
    <Card>
    <Card.Img variant="top" height='160px' src="data:image/jpeg;base64,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" />
    <Card.Body>
      <Card.Title>manitou mi25g</Card.Title>
      <Card.Text>
    Komplety katalog manitou mi25g
      </Card.Text>
    </Card.Body>
  </Card>  <Card>
    <Card.Img variant="top" height='160px' src="https://files.ekmcdn.com/vintagetractor/images/deutz-fahr-combine-topliner-4075-4080-4090-parts-manual-24223-p.png?w=1000&h=1000&v=E67C666D-9A2B-48A0-B4DF-DCE648A07430" />
    <Card.Body>
      <Card.Title className='text-truncate'>Deutz fahr 4075/4080/4090 -/h/hts </Card.Title>
      <Card.Text className='text-truncate'>
     -Brak-
      </Card.Text>
    </Card.Body>
  </Card>  <Card>
    <Card.Img variant="top" height='160px' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqbWkw7ep-ii1nR9r0JDHGO_OxVGO9mZEKOw&usqp=CAU" />
    <Card.Body>
      <Card.Title>kverneland pb 1xx 2001-2019</Card.Title>
      <Card.Text className='text-truncate'>
     katalog dotyczy modeli z rocznika 2001-2019
     Ilość korpusów 3-9
      </Card.Text>
    </Card.Body>
  </Card>   
</CardColumns>
</Container>
    </>
  )
}
export default Manage