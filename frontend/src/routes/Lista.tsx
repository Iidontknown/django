
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
  const [nazwa_lista_vaule, setnazwa_lista_vaule] = React.useState<string>('');
  const [error_nazwa_lista, setError_nazwa_lista] = React.useState<string>('');
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

const nazwa_lista_RegExp = RegExp(
  /^[A-Za-z][A-Za-z0-9_]{5,25}$/g
);
const nazwa_listaInuputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  event.preventDefault();
  const { name, value } = event.target;
  if (value.length < 5 ||value.length > 25 ) {
    setError_nazwa_lista("Nazwa listy nie może mieć mniej niż 5 znaków i wiecej niż 25.");
    setnazwa_lista_vaule(value)
  } else {
    setError_nazwa_lista("");
    setnazwa_lista_vaule(value)
    if (!nazwa_lista_RegExp.test(value)) {
      setError_nazwa_lista("Nie prawidłowy znak w nazwie katalogu.");
      setnazwa_lista_vaule(value)
      } else {
        setError_nazwa_lista("");
        setnazwa_lista_vaule(value)
      }
  }


}
const Dodajlista = () => {
  if(setnazwa_lista_vaule !=null){
  
    listaService.create(nazwa_lista_vaule )
    .then((response: any) => {
      console.log("dodano:" );
      console.log(response);
      window.location.reload();
    window.alert("dodano");
    })
    .catch((e: Error) => {
      console.log(e);
    });


    
  }else{
    window.alert("brak modelu");
  }
};
  return (
    <Container>
<Row >
          <strong>Twoje listy czesci:</strong>
          </Row>
          <input
              type="text"
              name="nazwa_grupa"
              id="nazwa_grupa"
              onChange={nazwa_listaInuputChange}
              value={nazwa_lista_vaule}
              className={`form-control ${
                error_nazwa_lista != "" ? "is-invalid" : ""
              }`}
            />
       <Button onClick={Dodajlista}>Dodaj</Button><ul>
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