import * as React from 'react';
import { Card, Button, CardGroup, Container } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import { CardColumns } from 'reactstrap';
import MenuBar from './MenuBar';
export default function Lista():JSX.Element  {
  return (
    <> 
 <Container>
    <CardColumns>
    <Card>
    <Card.Img variant="top" src="https://engine.od.ua/imgl/img_6140_1.jpg" />
    <Card.Body>
      <Card.Title>katalog</Card.Title>
      <Card.Text>
     Przykładowy opis
      </Card.Text>
    </Card.Body>
  </Card> 
 
</CardColumns></Container>
      </>
  )
}