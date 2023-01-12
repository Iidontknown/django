import * as React from "react";
import { useEffect } from "react";
import {
  Row,
  Form,
  Col,
  Button,
  Container,
  Image,
  InputGroup,
} from "react-bootstrap";
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
import { getCurrentUser } from "../../services/auth.service";

const StronaKatalog: React.FC = () => {
  const regexp = RegExp(/^[A-Za-z][A-Za-z0-9_]{5,25}$/g);
  const [inputNazwa_Czesc, setInputNazwa_Czesc] =
  React.useState<string>("");
const [errornazwa_Czesc, setErrornazwa_Czesc] =
  React.useState<string>("");
  const [inputOpis_Czesc, setInputOpis_Czesc] =
    React.useState<string>("");
  const [errorOpis_Czesc, setErrorOpis_Czesc] =
    React.useState<string>("");
    const [inputOpis_Numer_katalogowy_Czesc, setInputOpis_Numer_katalogowy_Czesc] =
    React.useState<string>("");
  const [errorOpis_Numer_katalogowy_Czesc, setErrorOpis_Numer_katalogowy_Czesc] =
    React.useState<string>("");


  const [error_opis_Numer_katalogowy, setError_opis_Numer_katalogowy] =
    React.useState<string>("");
  const [inputOpis_Numer_katalogowy, setInputOpis_Numer_katalogowy] =
    React.useState<string>("");
  const [errorNumer_katalogowy_strona, setErrorNumer_katalogowy_strona] =
    React.useState<string>("");
  const [inputNumer_katalogowy_strona, setInputNumer_katalogowy_strona] =
    React.useState<string>("");
  const [InputNumer_katalogowy, setInputNumer_katalogowy] =
    React.useState<Numer_katalogowyData>({
      numer_katalogowy_strona: "",
      id: 0,
      opis_Numer_katalogowy: "",
      strona_katalog: 0,
    });
  const aktualnyUser = getCurrentUser();
  const [Numer_katalogowye, setNumer_katalogowye] = React.useState<
    Array<Numer_katalogowyData>
  >([]);
  const [czesc, setCzesc] = React.useState<Array<CzescData>>([]);
  const [numer_katalogowy_czesc, setNumer_katalogowy_czesc] = React.useState<
    Array<Array<Numer_katalogowy_CzescData>>
  >([[]]);
  const [LoadingZdjecie, setLoadingZdjecie] = React.useState<Boolean>(true);
  const [pokazId, setpokazId] = React.useState<number>(-1);
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
        let tempCzesc = czesc;
        tempCzesc[x] = response.data;
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

  const opis_Numer_katalogowyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const { name, value } = event.target;
    if (value.length < 5 || value.length > 25) {
      setError_opis_Numer_katalogowy(
        "nie może mieć mniej niż 5 znaków i wiecej niż 25."
      );
      setInputOpis_Numer_katalogowy(value);
    } else {
      setError_opis_Numer_katalogowy("");
      if (!regexp.test(value)) {
        setInputOpis_Numer_katalogowy(value);
        setError_opis_Numer_katalogowy("Nie prawidłowy znak ");
      } else {
        setInputOpis_Numer_katalogowy(value);
        setError_opis_Numer_katalogowy("");
      }
    }
  };
  const numer_katalogowy_stronaChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const { name, value } = event.target;
    if (value.length < 5 || value.length > 25) {
      setErrorNumer_katalogowy_strona(
        "nie może mieć mniej niż 5 znaków i wiecej niż 25."
      );
      setInputNumer_katalogowy_strona(value);
    } else {
      setError_opis_Numer_katalogowy("");
      if (!regexp.test(value)) {
        setInputNumer_katalogowy_strona(value);
        setErrorNumer_katalogowy_strona("Nie prawidłowy znak ");
      } else {
        setInputNumer_katalogowy_strona(value);
        setErrorNumer_katalogowy_strona("");
      }
    }
  };

  const nazwa_CzescChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const { name, value } = event.target;
    if (value.length < 5 || value.length > 25) {
      setErrornazwa_Czesc(
        "nie może mieć mniej niż 5 znaków i wiecej niż 25."
      );
      setInputNazwa_Czesc(value);
    } else {
      setErrornazwa_Czesc("");
      if (!regexp.test(value)) {
        setInputNazwa_Czesc(value);
        setErrornazwa_Czesc("Nie prawidłowy znak ");
      } else {
        setInputNazwa_Czesc(value);
        setErrornazwa_Czesc("");
      }
    }
  };
  const opis_Numer_katalogowy_CzescChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const { name, value } = event.target;
    if (value.length < 5 || value.length > 25) {
      setErrorOpis_Numer_katalogowy_Czesc(
        "nie może mieć mniej niż 5 znaków i wiecej niż 25."
      );
      setInputOpis_Numer_katalogowy_Czesc(value);
    } else {
      setErrorOpis_Numer_katalogowy_Czesc("");
      if (!regexp.test(value)) {
        setInputOpis_Numer_katalogowy_Czesc(value);
        setErrorOpis_Numer_katalogowy_Czesc("Nie prawidłowy znak ");
      } else {
        setInputOpis_Numer_katalogowy_Czesc(value);
        setErrorOpis_Numer_katalogowy_Czesc("");
      }
    }
  };
  const opis_CzescChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const { name, value } = event.target;
    if (value.length < 5 || value.length > 25) {
      setErrorOpis_Czesc(
        "nie może mieć mniej niż 5 znaków i wiecej niż 25."
      );
      setInputOpis_Czesc(value);
    } else {
      setErrorOpis_Czesc("");
      if (!regexp.test(value)) {
        setInputOpis_Czesc(value);
        setErrorOpis_Czesc("Nie prawidłowy znak ");
      } else {
        setInputOpis_Czesc(value);
        setErrorOpis_Czesc("");
      }
    }
  };
  const dodajCzesc = () => {
    if (true) {
      CzescService.create(inputNazwa_Czesc,inputOpis_Czesc
      )
        .then((response: any) => {
          console.log("dodano:" + response.data);
          console.log(response);
          dodajCzesc_numer_katalogowy(inputOpis_Numer_katalogowy_Czesc,Numer_katalogowye[pokazId].id,response.data.id)
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  };
  const dodajNumer_katalogowy = () => {
    if (typeof pokazId !=undefined) {
      Numer_katalogowyService.create(
        inputNumer_katalogowy_strona,
        inputOpis_Numer_katalogowy,
        strona_katalog.id
      )
        .then((response: any) => {
          console.log("dodano:" + response);
          console.log(response);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  };
  const dodajCzesc_numer_katalogowy = (opis_Numer_katalogowy_Czesc:string,numer_katalogowy:number,czesc:number) => {
    if (true) {
      Numer_katalogowy_czescService.create(opis_Numer_katalogowy_Czesc,numer_katalogowy,czesc)
        .then((response: any) => {
          console.log("dodano:" + response.data);
          console.log(response);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
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
                {aktualnyUser.user_id == katalog.katalog_wlascicel ? (
                  <Row className="border p-1  mt-2 d-flex flex-row">
                    <div className="w-100 ">
                      <InputGroup hasValidation className="m-2">
                        <InputGroup.Text>
                          numer katalogowy strona
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          required
                          value={inputNumer_katalogowy_strona}
                          onChange={numer_katalogowy_stronaChange}
                          isInvalid={
                            errorNumer_katalogowy_strona ? true : false
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errorNumer_katalogowy_strona}
                        </Form.Control.Feedback>
                      </InputGroup>
                      <InputGroup hasValidation className="m-2">
                        <InputGroup.Text>numer katalogowy opis</InputGroup.Text>
                        <Form.Control
                          type="text"
                          required
                          isInvalid={error_opis_Numer_katalogowy ? true : false}
                          value={inputOpis_Numer_katalogowy}
                          onChange={opis_Numer_katalogowyChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          {error_opis_Numer_katalogowy}
                        </Form.Control.Feedback>
                      </InputGroup>
                      <div className="w-100 btn-group d-flex justify-content-center m-2">
                        <Button
                          className="btn btn-success d-flex "
                          onClick={dodajNumer_katalogowy}
                        >
                          Dodaj numer katalogowy
                        </Button>
                      </div>
                    </div>
                  </Row>
                ) : (
                  <></>
                )}

                {Numer_katalogowye &&
                  Numer_katalogowye.map((val, key) => (
                    <>
                      <Row className="border p-1  mt-3 d-flex flex-row">
                        <div className="w-100 ">
                          Numer katalogowy: {val.numer_katalogowy_strona}
                          {pokazId == key ? (
                            <>
                              <br />
                              Opis: {val.opis_Numer_katalogowy}
                              <br />
                              Numery pasujących cześci:
                              <br />
                              {aktualnyUser.user_id ==
                              katalog.katalog_wlascicel ? (
                                <div className="border p-1  mt-2 d-flex flex-row">
                                  <div className="w-100 ">
                                    <InputGroup hasValidation className="m-2">
                                      <InputGroup.Text>
                                      Nazwa Czesc
                                      </InputGroup.Text>
                                      <Form.Control
                                        type="text"
                                        required
                                        value={inputNazwa_Czesc}
                                        onChange={nazwa_CzescChange}
                                        isInvalid={
                                          errornazwa_Czesc
                                            ? true
                                            : false
                                        }
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        {errornazwa_Czesc}
                                      </Form.Control.Feedback>
                                    </InputGroup>
                                    <InputGroup hasValidation className="m-2">
                                      <InputGroup.Text>
                                      opis
                                      </InputGroup.Text>
                                      <Form.Control
                                        type="text"
                                        required
                                        isInvalid={
                                          errorOpis_Czesc
                                            ? true
                                            : false
                                        }
                                        value={inputOpis_Czesc}
                                        onChange={opis_CzescChange}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        {errorOpis_Czesc}
                                      </Form.Control.Feedback>
                                    </InputGroup>
                                    <InputGroup hasValidation className="m-2">
                                      <InputGroup.Text>
                                      opis Cześć-Numer Katalogowy
                                      </InputGroup.Text>
                                      <Form.Control
                                        type="text"
                                        required
                                        isInvalid={
                                          errorOpis_Numer_katalogowy_Czesc
                                            ? true
                                            : false
                                        }
                                        value={inputOpis_Numer_katalogowy_Czesc}
                                        onChange={opis_Numer_katalogowy_CzescChange}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        {errorOpis_Numer_katalogowy_Czesc}
                                      </Form.Control.Feedback>
                                    </InputGroup>

                                    <div className="w-100 btn-group d-flex justify-content-center m-2">
                                      <Button
                                        className="btn btn-success d-flex "
                                        onClick={dodajCzesc}
                                      >
                                        Dodaj czesc
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <></>
                              )}
                              {numer_katalogowy_czesc[key].length ? (
                                numer_katalogowy_czesc[key].map(
                                  (vali_li, key_li) => (
                                    <>
                                      <li>{vali_li.czesc_nazwa_Czesc}</li>
                                    </>
                                  )
                                )
                              ) : (
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
