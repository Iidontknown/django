import React, { useRef } from "react";
import { useEffect } from "react";
import { Row, Form, Col, Button } from "react-bootstrap";
import ProducentService from "../../services/ProducentService";
import ProducentData from "../../types/producent";
import Select, { PropsValue, SingleValue } from "react-select";
import ModellData from "../../types/modell";
import ModellService from "../../services/ModellService";
import KatalogData from "../../types/katalog";
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
    console.log(nowyKatalog);
    console.log(publicKatalog);
  };
  function selectFiltermodelproducent(element: ModellData) {
    return element.Producent == selectProducentid;
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
              <Col lg={2}>
                <input type="text" className="form-control" />
              </Col>
            </Row>
            <br />
            {/* <Row>
              <Col>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <input type="checkbox"  onChange={() => setpublicKatalog((publicKatalog) => !publicKatalog)}/>
                    </div>
                  </div>
                  <input
                    type="disable"
                    className="form-control"
                    placeholder="Zaznacz aby katalog był publiczny"
                  />
                </div>
              </Col>
            </Row> */}
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
