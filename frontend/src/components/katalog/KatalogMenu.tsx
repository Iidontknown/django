import * as React from 'react';
import { useEffect } from 'react';
import { Row, Form, Col, Button, Card, Container, } from 'react-bootstrap';
import ProducentService from '../../services/ProducentService';
import ProducentData from '../../types/producent';
import Select, { SingleValue } from "react-select";
import ModellData from '../../types/modell';
import { CardColumns } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import { getCurrentUser } from '../../services/auth.service';
import KatalogService from '../../services/KatalogService';
import KatalogData from './../../types/katalog';
import Strona_katalogService from '../../services/Strona_katalogService';
import strona_katalogData from '../../types/strona_katalog';


const KatalogMenu: React.FC = () => {
  
  const [inputnazwa_strony, setinputnazwa_strony] = React.useState<string>('');
  const [setError_inputnazwa_strony, setsetError_inputnazwa_strony] = React.useState<string>('');
  const [inputerror, setinputerror] = React.useState<boolean>(true);
  const [loading, setloading] = React.useState<boolean>(true);
  const [errormessage, seterrormessage] = React.useState<string>("");
  const [strona_katalogi, setstrona_katalogi] = React.useState<Array<strona_katalogData>>([]);
  const regexp = RegExp(
    /^[A-Za-z][A-Za-z0-9_]{5,25}$/g
  );
  const [kolejnaStrona, setkolejnaStrona] = React.useState<number>(1);
  const [katalog,setKatalog]= React.useState<KatalogData>({
    id: 0,
    modell: 0,
    katalog_wlascicel: 0,
    nazwa_katalog: "asd",
    opis_katalog:"asd",
  });
  const { id} = useParams();

  const aktualnyUser = getCurrentUser();
  console.log(aktualnyUser)
  useEffect(() => {
    getkatalog(id);
    const tempidkatalog=Number(id)
    getStrona_katalogi(tempidkatalog)
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

  const InuputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    if (value.length < 5 ||value.length > 25 ) {
      setsetError_inputnazwa_strony("Nazwa katalogu nie może mieć mniej niż 5 znaków i wiecej niż 25.");
      setinputerror(true)
      setinputnazwa_strony(value)
    } else {
      setsetError_inputnazwa_strony("");
      setinputerror(false)
      setinputnazwa_strony(value)
      if (!regexp.test(value)) {
        setsetError_inputnazwa_strony("Nie prawidłowy znak w nazwie katalogu.");
        setinputerror(true)
        setinputnazwa_strony(value)
        } else {
          setsetError_inputnazwa_strony("");
          setinputerror(false)
          setinputnazwa_strony(value)
        }
    }


  }
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
    
     
 {strona_katalogi&&
   strona_katalogi.map((val, key) => (
    <><Link key={key} to={'/katalog/'+val.katalog_nadrzedny+'/'+val.id+'/'}>
      <Card >
    <Card.Img variant="top" height='160px' src={"http://localhost:8000/api/" + val.zdjecie_image_Thumbnails}/>
    <Card.Body>
      <Card.Title>{val.nazwa_strony}</Card.Title>
      <div className="text-right">{val.numer_strony}</div>
    </Card.Body>
  </Card> </Link>
    
  </>
))

 }

{katalog.katalog_wlascicel==aktualnyUser.user_id?(
      <>
       <Card >
        
    <Card.Body>
    <p>Dodaj Strone do katalogu</p>
      <input type='file' placeholder='Dodaj zdjecie'  accept="image/png, image/gif, image/jpeg"></input>
      <input type='text' placeholder='Nazwa Strony'name='nazwa_strony' value={inputnazwa_strony} onChange={InuputChange}></input>
      <input type='number' placeholder='Numer strony' min='1'></input>
       <div className="m-10 btn-group d-flex justify-content-center">
              <button className="btn btn-success  " disabled>Dodaj stronę</button>
            </div>
    </Card.Body>
  </Card>
      </>
    ):( <>
      </>)
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