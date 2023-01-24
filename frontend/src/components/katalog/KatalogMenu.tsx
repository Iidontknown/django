import * as React from "react";
import { useEffect } from "react";
import { Row, Form, Col, Button, Card, Container, FormGroup } from "react-bootstrap";
import ProducentService from "../../services/ProducentService";
import ProducentData from "../../types/producent";
import Select, { SingleValue } from "react-select";
import ModellData from "../../types/modell";
import { CardColumns } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { getCurrentUser } from "../../services/auth.service";
import KatalogService from "../../services/KatalogService";
import KatalogData from "./../../types/katalog";
import Strona_katalogService from "../../services/Strona_katalogService";
import strona_katalogData from "../../types/strona_katalog";
import ZdjecieService from "../../services/ZdjecieService";
import GrupaData from './../../types/grupa';
import GrupyService from "../../services/GrupyService";
import Katalog_GrupaService from "../../services/Katalog_GrupaService";
import Katalog_GrupaData from "../../types/katalog_grupa";

const KatalogMenu: React.FC = () => {
  const [selectGrupa, setselectGrupa] = React.useState<
  GrupaData|null
>(null);
const [listagrup, setlistagrup] = React.useState<
Array<GrupaData>
>([]);
const [listakataloggrupa, setlistakataloggrupa] = React.useState<
    Array<Katalog_GrupaData>
  >([]);
  const [Error_InuputImage, setError_InuputImage] = React.useState<string>("Dodaj Zdjecie strony");
  const [image, setImage] = React.useState<File|null>(null);
  const [inputnazwa_strony, setinputnazwa_strony] = React.useState<string>("");
  const [inputopis_zdjecie, setinputopis_zdjecie] = React.useState<string>("");
  const [Error_inputopis_zdjecie, setError_inputopis_zdjecie] = React.useState<string>("Dodaj opis zdjecie");
  const [Error_InuputNumer_stronyChange, setError_InuputNumer_stronyChange] =
    React.useState<string>("");
    const [Error_inputnazwa_strony, setError_inputnazwa_strony] =
    React.useState<string>("Wpisz nazwe strony");
  const [loading, setloading] = React.useState<boolean>(true);
  const [errormessage, seterrormessage] = React.useState<string>("");
  const [strona_katalogi, setstrona_katalogi] = React.useState<
    Array<strona_katalogData>
  >([]);
  const regexp = RegExp(/^[A-Za-z][A-Za-z0-9_]{5,25}$/g);
  const [inputnumer_strony, setinputnumer_strony] = React.useState<number>(1);
  const [katalog, setKatalog] = React.useState<KatalogData>({
    id: 0,
    modell: 0,
    katalog_wlascicel: 0,
    nazwa_katalog: "asd",
    opis_katalog: "asd",
  });
  const { id } = useParams();
  const idKatalog_nadrzedny=Number(id)
  const aktualnyUser = getCurrentUser();
  useEffect(() => {
    getkatalog(idKatalog_nadrzedny);
    const tempidkatalog = Number(idKatalog_nadrzedny);
    getStrona_katalogi(tempidkatalog);
   
    
  }, []);
  const getkatalog = (x: any) => {
    KatalogService.get_id(x)
      .then((response: any) => {
        console.log(response);
        setKatalog(response.data);
        setloading(false);
        getGrupy()
        
      })
      .catch((e: Error) => {
        seterrormessage("błąd z pokazanie katalogu z numerem: " + idKatalog_nadrzedny);
        console.log(e);
      });
  };

  const getStrona_katalogi = (x: number) => {
    Strona_katalogService.getwybranyKatalog(x)
      .then((response: any) => {
        console.log(response.data);
        setstrona_katalogi(response.data);
        console.log(strona_katalogi);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const getGrupy = () => {
    getkataloggrupa()
    GrupyService.get_katalogwherekataloggrupa(idKatalog_nadrzedny)
      .then((response: any) => {
        console.log(response.data);
        setlistagrup(response.data);
        console.log(listagrup);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const getkataloggrupa = () => {
    Katalog_GrupaService.getall()
      .then((response: any) => {
        console.log(response.data);
        setlistakataloggrupa(response.data);
        console.log(listagrup);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const inputnazwa_stronyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    if (value.length < 5 || value.length > 25) {
      setError_inputnazwa_strony(
        "Nazwa katalogu nie może mieć mniej niż 5 znaków i wiecej niż 25."
      );
      setinputnazwa_strony(value);
    } else {
      setError_inputnazwa_strony("");
      setinputnazwa_strony(value);
      if (!regexp.test(value)) {
        setError_inputnazwa_strony("Nie prawidłowy znak w nazwie katalogu.");
        setinputnazwa_strony(value);
      } else {
        setError_inputnazwa_strony("");
        setinputnazwa_strony(value);
      }
    }
  };
  const inputopis_zdjecieChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    if (value.length < 5 || value.length > 25) {
      setError_inputopis_zdjecie(
        "nie może mieć mniej niż 5 znaków i wiecej niż 25."
      );
      setinputopis_zdjecie(value);
    } else {
      setError_inputopis_zdjecie('');
      setinputopis_zdjecie(value);
      if (!regexp.test(value)) {
        setError_inputopis_zdjecie("Nie prawidłowy znak ");
        setinputopis_zdjecie(value);
      } else {
        setError_inputopis_zdjecie("");
        setinputopis_zdjecie(value);
      }
    }
  };

  const InuputNumer_stronyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    if ( Number(value) <1 ) {
      setError_InuputNumer_stronyChange("liczba stron musi być dodatnia")
      setinputnumer_strony(Number(value));
    } else {
      setError_InuputNumer_stronyChange('')
      setinputnumer_strony(Number(value));
     
    }
  };
  const inputImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const  files  = event.currentTarget.files;
    const selectedFiles = files as FileList;
    console.log(selectedFiles.item(0))
    if(selectedFiles.item(0)!== null){

      setImage(selectedFiles.item(0));
      setError_InuputImage("")
    }else{

      setError_InuputImage("Wybierz zdjecie")
    }
  };

  const dodajZdjecieiKatalog = ( )=> {
    if (Error_InuputNumer_stronyChange =='' && Error_InuputImage=='' &&Error_inputnazwa_strony=='' && image!=null && Error_inputopis_zdjecie=='') {
      ZdjecieService.create(image,inputopis_zdjecie)
        .then((response: any) => {
          console.log("dodano:" + response.data.id);
          console.log(response);
          dodajStronaKatalog(Number(idKatalog_nadrzedny),inputnumer_strony,inputnazwa_strony,response.data.id)
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  };

    const dodajStronaKatalog = (katalog_nadrzedny:number,numer_strony:number,nazwa_strony:string,zdjecie_strona_katalog:number )=> {
      if (Error_InuputNumer_stronyChange =='' && Error_InuputImage=='' &&Error_inputnazwa_strony=='' && image!=null && Error_inputopis_zdjecie=='') {
        Strona_katalogService.create(katalog_nadrzedny,numer_strony,nazwa_strony,zdjecie_strona_katalog)
          .then((response: any) => {
            console.log("dodano:" + response.data);
            console.log(response);
           
          })
          .catch((e: Error) => {
            console.log(e);
          });
      }
    };
    const SelectgrupaOnchange = (selected: SingleValue<GrupaData>) => {
      setselectGrupa(selected)
      
    };
    const dodajkataloggrupa = ( )=> {
      if (selectGrupa!= null) {
        Katalog_GrupaService.create(selectGrupa.id,idKatalog_nadrzedny)
          .then((response: any) => {
            console.log("dodano:" + response.data.id);
            console.log(response);
            window.alert("Dodano");
            setselectGrupa(null)
            getGrupy()
          })
          .catch((e: Error) => {
            console.log(e);
          });
      }
    };
    const delatekataloggrupa = (id:number )=> {
        Katalog_GrupaService.delete_id(id)
          .then((response: any) => {
            console.log("dodano:" + response.data.id);
            console.log(response);
            window.alert("usuniento");
            setselectGrupa(null)
            getGrupy()
          })
          .catch((e: Error) => {
            console.log(e);
          });
    };
  return (
    <>
      {" "}
      {!loading && (
        <Container className="pt-1">
          <div className=" text-center">
            <h1 className="display-4">{katalog.nazwa_katalog} </h1>
            <p>Własiciel: {katalog.katalog_wlascicel_username} </p>
          </div>
          <hr />
          {katalog.katalog_wlascicel == aktualnyUser.user_id ? (
              <>
                <Row>
                  <div>
                    <p>Dodaj Strone do katalogu</p>
                    <FormGroup>
                    <input
                      type="file"
                      placeholder="Dodaj zdjecie"
                      accept="image/png, image/gif, image/jpeg"
                      onChange={inputImageChange}
                    ></input>{Error_InuputImage}</FormGroup>
                    <FormGroup>
                    <input
                      type="text"
                      placeholder="opis Zdjecie"
                      name="opis_zdjecie"
                      value={inputopis_zdjecie}
                      onChange={inputopis_zdjecieChange}
                    ></input>{Error_inputopis_zdjecie}</FormGroup>
                    <FormGroup>
                    <input
                      type="text"
                      placeholder="Nazwa Strony"
                      name="nazwa_strony"
                      value={inputnazwa_strony}
                      onChange={inputnazwa_stronyChange}
                    ></input>{Error_inputnazwa_strony}</FormGroup>
                    <FormGroup>
                    <input
                    value={inputnumer_strony}
                    onChange={InuputNumer_stronyChange}
                      type="number"
                      name='numer_strony'
                      placeholder="Numer strony"
                     
                    ></input>{Error_InuputNumer_stronyChange}</FormGroup>
                    <div className="m-10 btn-group d-flex justify-content-center">
                      <button className="btn btn-success  "  onClick={dodajZdjecieiKatalog} >
                        Dodaj stronę
                      </button>
                    </div>
                  </div>
                </Row>
                <hr></hr>
                <Row>
                  {listakataloggrupa&&
              listakataloggrupa.map((val, key) => (<><Col >
              {val.grupa_nazwa_grupa}<Button onClick={() => delatekataloggrupa(val.id)}>usuń</Button>
              </Col>
              </>))}</Row><Row>
                <Select<GrupaData>
                  getOptionLabel={(grupa: GrupaData) =>
                    grupa.nazwa_grupa
                  }
                  getOptionValue={(grupa: GrupaData) =>
                    grupa.id.toString()
                  }
                  options={listagrup}
                  isClearable={true}
                  backspaceRemovesValue={true}
                  placeholder="wybierz grupę"
                  onChange={SelectgrupaOnchange}
                  value={selectGrupa}
                />
                </Row>
                <button className="btn btn-success  "  onClick={dodajkataloggrupa} >
                        Dodaj grupa katalog
                      </button>
              </>
            ) : (
              <></>
            )}
          <CardColumns>
            {strona_katalogi &&
              strona_katalogi.map((val, key) => (
                <>
                  <Link
                    key={key}
                    to={
                      "/katalog/" + val.katalog_nadrzedny + "/" + val.id + "/"
                    }
                  >
                    <Card>
                      <Card.Img
                        variant="top"
                        height="160px"
                        src={
                          "http://localhost:8000/api/" +
                          val.zdjecie_image_Thumbnails
                        }
                      />
                      <Card.Body>
                        <Card.Title>{val.nazwa_strony}</Card.Title>
                        <div className="text-right">{val.numer_strony}</div>
                      </Card.Body>
                    </Card>{" "}
                  </Link>
                </>
              ))}

           
          </CardColumns>
        </Container>
      )}
      {errormessage && (
        <Container className="p-3 text-center">
          <h3>{errormessage}</h3>
        </Container>
      )}
    </>
  );
};
export default KatalogMenu;
