import React, { useRef } from "react";
import { useEffect } from "react";
import { Row, Form, Col, Button } from "react-bootstrap";
import ProducentService from "../../services/ProducentService";
import ProducentData from "../../types/producent";
import Select, { PropsValue, SingleValue } from "react-select";
import ModellData from "../../types/modell";
import ModellService from "../../services/ModellService";
import KatalogData from "../../types/katalog";
import KatalogService from "../../services/KatalogService";
const Dodaj: React.FC = () => {
  const [listaProducent, setlistaProducent] = React.useState<
    Array<ProducentData>
  >([]);
  const [listaModell, setlistaModell] = React.useState<Array<ModellData>>([]);
  const [publicKatalog, setpublicKatalog] = React.useState<Boolean>(false);
  const [nowyKatalog, setnowyKatalog] = React.useState<KatalogData>({
    id: 0,
    modell: 0,
    katalog_wlascicel: 0,
    nazwa_katalog: "",
  });
  const [selectProducentid, setselectProducentid] = React.useState<
    number | null
  >(null);
  const [selectModellid, setselectModellid] = React.useState<number | null>(
    null
  );

  const [selectModell, setselectModell] = React.useState<ModellData | null>(
    null
  );
  const [errorModell, seterrorModell] = React.useState<String>(
    ""
  );
  const [nazwa_katalog_vaule, setnazwa_katalog_vaule] = React.useState<string>(
    ""
  );
  const [Error_nazwa_katalog, setError_nazwa_katalog] = React.useState<string>(
    ""
  );
  
  useEffect(() => {
    ProducentService.getall().then(
      (response) => {
        try {
          setlistaProducent(response.data);
          console.log(response.data);
        } catch (error) {
          console.log("błąd axios" + error);
        }
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(error);
      }
    );
  }, []);

  useEffect(() => {
    ModellService.getall().then(
      (response) => {
        try {
          setlistaModell(response.data);
          console.log(response.data);
        } catch (error) {
          console.log("błąd axios" + error);
        }
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(error);
      }
    );
  }, []);

  const SelectProducentOnchange = (selected: SingleValue<ProducentData>) => {
    console.log(selectModell);
    if (selected != null) {
      setselectProducentid(selected.id);
      setselectModellid(null);

      setselectModell(null);
    } else {
      setselectProducentid(null);
      setselectModellid(null);
      setselectModell(null);
    }
  };
  const SelectModelOnchange = (selected: SingleValue<ModellData>) => {
    if (selected != null) {
      setselectModellid(selected.id);
      let temp :KatalogData=nowyKatalog
      temp.modell=selected.id
      setnowyKatalog(temp);
      setselectModell(selected);
    } else {
      setselectModellid(null);
    }
  };
  const DodajKatalog = () => {
    if(nowyKatalog.modell!=0){
      if(nowyKatalog.modell!=0){
      
        KatalogService.create( "nowyKatalog1",1)
        .then((response: any) => {
          console.log("dodano:" );
          console.log(response);

        })
        .catch((e: Error) => {
          console.log(e);
        });
    

        
      }else{
        window.alert("brak modelu");
      }
    }else{
      window.alert("brak modelu");
    }
    console.log(nowyKatalog);
    console.log(publicKatalog);
  };
  function selectFiltermodelproducent(element: ModellData) {
    return element.Producent == selectProducentid;
  }
  const nazwa_grupa_regexp = RegExp(
    /^[A-Za-z][A-Za-z0-9_]{5,25}$/g
  );

  const nazwa_katalogInuputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    if (value.length < 5 ||value.length > 25 ) {
      setError_nazwa_katalog("Nazwa katalogu nie może mieć mniej niż 5 znaków i wiecej niż 25.");
      setnazwa_katalog_vaule(value)
    } else {
      setError_nazwa_katalog("");
      setnazwa_katalog_vaule(value)
      if (!nazwa_grupa_regexp.test(value)) {
        setError_nazwa_katalog("Nie prawidłowy znak w nazwie katalogu.");
          setnazwa_katalog_vaule(value)
        } else {
          setError_nazwa_katalog("");
          setnazwa_katalog_vaule(value)
        }
    }


  }
  return (
    <>
      <Form>
        <div className="container">
          <div className="p-2">
            <Row>
              <Form.Label column lg={2}>
                Producent
              </Form.Label>
              <Col>
                <Select<ProducentData>
                  getOptionLabel={(producent: ProducentData) =>
                    producent.nazwa_producent
                  }
                  getOptionValue={(producent: ProducentData) =>
                    producent.id.toString()
                  }
                  options={listaProducent}
                  isClearable={true}
                  backspaceRemovesValue={true}
                  placeholder="Podaj nazwę producenta"
                  onChange={SelectProducentOnchange}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Form.Label column lg={2}>
                model
              </Form.Label>
              <Col>
                <Select<ModellData>
                  getOptionLabel={(modell: ModellData) => modell.nazwa_model}
                  getOptionValue={(modell: ModellData) => modell.id.toString()}
                  options={listaModell.filter(selectFiltermodelproducent)}
                  isClearable={true}
                  backspaceRemovesValue={true}
                  placeholder="Podaj nazwę model"
                  onChange={SelectModelOnchange}
                  value={selectModell}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Form.Label column lg={2}>
                nazwa katalogu
              </Form.Label>
              <Col >
                {/* <input type="text" name="nazwa_katalog" className="form-control" /> */}
            <input
              type="text"
              name="nazwa_grupa"
              id="nazwa_grupa"
              onChange={nazwa_katalogInuputChange}
              value={nazwa_katalog_vaule}
              className={`form-control ${
                Error_nazwa_katalog != "" ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">{Error_nazwa_katalog}</div>
              </Col>
            </Row>
            <br />
           
          </div>
          <Row>
            <Col>
              <Button variant="primary" size="lg" onClick={DodajKatalog}>
                Dalej
              </Button>
            </Col>{" "}
          </Row>
        </div>
      </Form>
    </>
  );
};
export default Dodaj;
