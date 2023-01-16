
import * as React from 'react';
import { Button, Card, Container, Row } from 'react-bootstrap';
import listaService from '../services/ListaService';
import ListaData from '../types/lista';
import { useEffect } from 'react';
import { CardGroup } from 'react-bootstrap';
import numer_katalogowy_ListaService from '../services/Numer_katalogowy_ListaService';
import Numer_katalogowy_ListaData from '../types/numer_katalogowy_lista';
import { Link } from 'react-router-dom';



const Lista: React.FC = () => {  
  
  const [Listy, setListy] = React.useState<Array<ListaData>>([]);
  const [numer_katalogowy_Lista, setNumer_katalogowy_Lista] = React.useState<Array<Numer_katalogowy_ListaData>>([]);
  useEffect(() => {
    getalllisty()
    getallnumer_katalogowy_Lista()
  }, []);

  const getalllisty = () => {
    listaService.getall()
      .then((response: any) => {
        setListy(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }; 
  const getallnumer_katalogowy_Lista = () => {
    numer_katalogowy_ListaService.getall()
      .then((response: any) => {
        setNumer_katalogowy_Lista(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  

console.log(numer_katalogowy_Lista)
  return (
    <Container>
<Row >
          <strong>Twoje listy czesci:</strong>
          </Row>
       <Button>Dodaj</Button><ul>
            {Listy &&
            Listy.map((val) => <><Link to={`/lista/${val.id}`}> <li key="{val.id}"> {val.nazwa_lista}


            </li></Link><ol></ol> { numer_katalogowy_Lista && numer_katalogowy_Lista.map((valnumer) => 
            valnumer.lista==val.id?(<>
<p>
{valnumer.numer_katalogowy_nazwa_katalog} | {valnumer.numer_katalogowy_numer_katalogowy_strona} |{valnumer.numer_katalogowy_opis_Numer_katalogowy} {val.id}
</p></>
            ):(<></>)
            

            )}</>
            

            )}
            
            </ul>
          

     </Container>
  )
}
export default Lista;