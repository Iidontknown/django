import * as React from 'react';
import { useEffect } from 'react';
import { Row, Form, Col, Button, Card, Container, } from 'react-bootstrap';
import ProducentService from '../../services/ProducentService';
import ProducentData from '../../types/producent';
import Select, { SingleValue } from "react-select";
import ModellData from '../../types/modell';
import { CardColumns } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { getCurrentUser } from '../../services/auth.service';
import KatalogService from '../../services/KatalogService';
import KatalogData from './../../types/katalog';
import Strona_katalogService from '../../services/Strona_katalogService';
import strona_katalogData from '../../types/strona_katalog';


const KatalogMenu: React.FC = () => {
  
  const [loading, setloading] = React.useState<boolean>(true);
  const [errormessage, seterrormessage] = React.useState<string>("");
  const [strona_katalogi, setstrona_katalogi] = React.useState<Array<strona_katalogData>>([]);

  const [katalog,setKatalog]= React.useState<KatalogData>({
    id: 0,
    modell: 0,
    katalog_wlascicel: 0,
    nazwa_katalog: "asd",
    opis_katalog:"asd",
  });
  let { id } = useParams();
  const aktualnyUser = getCurrentUser();
  console.log(aktualnyUser)
  useEffect(() => {
    getkatalog(id);
    getStrona_katalogi(1)
  }, []);
  const getkatalog = (x:any) => {
    KatalogService.get_id(x)
      .then((response: any) => {
        console.log(response.data);
        setKatalog(response.data)
        setloading(false)
      })
      .catch((e: Error) => {
        seterrormessage("błąd z pokazanie katalogu z numerem: "+id)
        console.log(e);
      });
  };
  

  const getStrona_katalogi = (x:number) => {
    Strona_katalogService.getwybranyKatalog(x)
      .then((response: any) => {
        console.log(response.data);
        setstrona_katalogi(response.data)
        console.log(strona_katalogi);
        
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  return (
    <> {!loading&&
    <Container className='pt-1'>
    <div className=" text-center">
    <h1 className="display-4">{katalog.nazwa_katalog} </h1>
    {katalog.katalog_wlascicel==aktualnyUser.user_id?(
      <>
      <p >Własiciel: {aktualnyUser.username}  </p>
      </>
    ):( <>
      <p >Własiciel: {katalog.katalog_wlascicel}  </p>
      </>)
    }
  </div>
  <hr/>
     <CardColumns>
    
     <Card>
    <Card.Img variant="top" height='160px' src="https://cdn.shopify.com/s/files/1/2222/6299/products/deutz1_245438b8-6fbf-4aef-955d-5c212c946e5a_1024x1024@2x.jpg?v=1527328553" />
    <Card.Body>
      <Card.Title>Przykładowa nazwa strony</Card.Title>
      <div className="text-right">1</div>
    </Card.Body>
  </Card> 
 {strona_katalogi&&
   strona_katalogi.map((val, key) => (
    <>
      <Card key={key}>
    <Card.Img variant="top" height='160px' src="https://cdn.shopify.com/s/files/1/2222/6299/products/deutz1_245438b8-6fbf-4aef-955d-5c212c946e5a_1024x1024@2x.jpg?v=1527328553" />
    <Card.Body>
      <Card.Title>{val.nazwa_strony}</Card.Title>
      <div className="text-right">{val.numer_strony}</div>
    </Card.Body>
  </Card> 
    </>
))

 }
</CardColumns>
</Container>
}
{errormessage&&
<Container className='p-3 text-center'>
<h3>{errormessage}</h3>
</Container>
}

    </>
  )
}
export default KatalogMenu