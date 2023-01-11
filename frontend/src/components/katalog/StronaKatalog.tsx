import * as React from "react";
import { useEffect } from "react";
import { Row, Form, Col, Button, Container, Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Strona_katalogService from "../../services/Strona_katalogService";
import strona_katalogData from "../../types/strona_katalog";
import Numer_katalogowyData from "../../types/numer_katalogowy";
import Numer_katalogowyService from "../../services/Numer_katalogowyService";
import ZdjecieService from "../../services/ZdjecieService";
import ZdjecieData from "./../../types/zdjecie";
import KatalogService from "../../services/KatalogService";
import KatalogData from "./../../types/katalog";
import ModellData from "./../../types/modell";
import ProducentData from "../../types/producent";
import ModellService from "../../services/ModellService";
import ProducentService from "../../services/ProducentService";
import Numer_katalogowy_czescService from "../../services/Numer_katalogowy_CzescService";
import Numer_katalogowy_CzescData from "../../types/numer_katalogowy_Czesc";
import CzescData from "../../types/czesc";
import CzescService from "../../services/CzescService";

const StronaKatalog: React.FC = () => {
  const [Numer_katalogowye, setNumer_katalogowye] = React.useState<
    Array<Numer_katalogowyData>
  >([]);
  const [czesc, setCzesc] = React.useState<
  Array<CzescData>
>([]);
  const [numer_katalogowy_czesc, setNumer_katalogowy_czesc] = React.useState<
    Array<Array<Numer_katalogowy_CzescData>>
  >([[]]);
  const [LoadingZdjecie, setLoadingZdjecie] = React.useState<Boolean>(true);
  const [pokazId, setpokazId] = React.useState<number>();
  const [katalog, setkatalog] = React.useState<KatalogData>({
    nazwa_katalog: "",
    id: 0,
    katalog_wlascicel: 0,
    modell: 0,
    opis_katalog: "",
  });
  const [modell, setModell] = React.useState<ModellData>({
    id: 0,
    nazwa_model: "",
    Producent: 0,
  });
  const [producent, setProducent] = React.useState<ProducentData>({
    id: 0,
    nazwa_producent: "",
  });
  const [strona_katalog, setstrona_katalog] =
    React.useState<strona_katalogData>({
      id: 0,
      katalog_nadrzedny: 0,
      nazwa_strony: "",
      numer_strony: 0,
      zdjecie_strona_katalog: 0,
    });
  const [zdjecie, setzdjecie] = React.useState<ZdjecieData>({
    id: 0,
    image: "",
    image_Thumbnails: "",
    opis_zdjecie: "",
    tytul_zdiecie: "",
    wlasciciel: 0,
  });
  const { id, idstrona } = useParams();

  useEffect(() => {
    const tempidkatalogstrona = Number(idstrona);
    const tempidkatalog = Number(id);
    getStrona_katalog(tempidkatalogstrona);
    getNumer_katalogowye(tempidkatalogstrona);
    getkatalog(tempidkatalog);
  }, []);
  console.log(id, idstrona);

  useEffect(() => {
    getZdjecie(strona_katalog.zdjecie_strona_katalog);
  }, [strona_katalog]);
  const getczesc = (x: number) => {
    CzescService.get_id(x)
      .then((response: any) => {
        console.log(response.data);
        let tempCzesc = czesc
        tempCzesc[x]=response.data
        setCzesc(tempCzesc);
        console.log(czesc);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const getStrona_katalog = (x: number) => {
    Strona_katalogService.get_id(x)
      .then((response: any) => {
        console.log(response.data);
        setstrona_katalog(response.data);
        console.log(strona_katalog);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const getNumer_katalogowye = (x: number) => {
    Numer_katalogowyService.getwybrany(x)
      .then((response: any) => {
        console.log(response.data);
        setNumer_katalogowye(response.data);
        console.log(strona_katalog);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const getkatalog = (x: number) => {
    KatalogService.get_id(x)
      .then((response: any) => {
        console.log(response.data);
        setkatalog(response.data);
        console.log(katalog);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getModell(katalog.modell);
  }, [katalog]);
  const getModell = (x: number) => {
    ModellService.get_id(x)
      .then((response: any) => {
        console.log(response.data);
        setModell(response.data);
        console.log(modell);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getProducent(modell.Producent);
  }, [modell]);
  const getProducent = (x: number) => {
    ProducentService.get_id(x)
      .then((response: any) => {
        console.log(response.data);
        setProducent(response.data);
        console.log(producent);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const getZdjecie = (x: number) => {
    ZdjecieService.get_id(x)
      .then((response: any) => {
        console.log(response.data);
        setzdjecie(response.data);
        console.log(zdjecie);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const getNumer_katalogowy_czesc = (x: number, key: number) => {
    Numer_katalogowy_czescService.getwybrany(x)
      .then((response: any) => {
        console.log(response.data);
        let temp = numer_katalogowy_czesc;

        temp[key] = response.data;

        setNumer_katalogowy_czesc(temp);
        
    setpokazId(key);
        console.log(numer_katalogowy_czesc);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const pokaz_opis = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;
    console.log(button.id);
    getNumer_katalogowy_czesc(Number(button.name), Number(button.id));
  };
  
  return (
    <>
      <Container className="w-100 mh-100 p-20">
        <Row>
          <Col className="">
            {zdjecie.image != "" && zdjecie.image != undefined ? (
              <Image
                width={540}
                src={"http://localhost:8000/api" + zdjecie.image}
                // onLoad={setLoadingZdjecie(false)}
              ></Image>
            ) : (
              <Image
                width={540}
                src={"https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"}
              ></Image>
            )}
          </Col>
          <Col className="">
            <div className="overflow-scroll">
              {" "}
              <div className="p-2">
                <Link to="/katalog">
                  {producent.nazwa_producent} {">"} {modell.nazwa_model} {">"}{" "}
                  {katalog.nazwa_katalog}
                </Link>
              </div>
              <Row className="d-flex justify-content-between border-top p-2">
                <Button>{"<"}</Button>
                <p>{strona_katalog.nazwa_strony}</p>
                <Button>{">"}</Button>
              </Row>
              <div>
                {Numer_katalogowye &&
                  Numer_katalogowye.map((val, key) => (
                    <>
                      <Row className="border p-1  mt-2 d-flex flex-row">
                        <div className="w-100 ">
                          Numer katalogowy: {val.numer_katalogowy_strona}
                          {pokazId == key ? (
                            <>
                              <br />
                              Opis: {val.opis_Numer_katalogowy}
                              <br />
                              Numery pasujących cześci:
                              <br />
                                {numer_katalogowy_czesc[key].length ?(
                                numer_katalogowy_czesc[key].map(
                                    (vali_li, key_li) => (
                                      <>
                                        <li>{vali_li.czesc_nazwa_Czesc}</li>
                                      </>
                                    )
                                  )) :(
                                    <>
                                        <li>brak</li>
                                      </>
                                  )}
                            </>
                          ) : (
                            <>
                              <Button
                                className="btn btn-info float-right mb-1"
                                id={key.toString()}
                                name={val.id.toString()}
                                onClick={pokaz_opis}
                              >
                                Pokaż
                              </Button>
                            </>
                          )}
                          {/* <br />
                          Opis: {val.opis_Numer_katalogowy}
                          <br />
                          Numery pasujących cześci:
                          <br />
                          <ul>
                            <li>m1234xszc - Przykładowy producent </li>
                            <li>43565l - Przykładowy producent2 </li>
                          </ul> */}
                        </div>
                        <div className="w-100 btn-group d-flex justify-content-center">
                          <Button className="btn btn-success d-flex ">
                            Dodaj do listy{" "}
                          </Button>
                        </div>
                      </Row>
                    </>
                  ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default StronaKatalog;
