import React, { useEffect, ChangeEvent, useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import GrupyService from "../services/GrupyService";
import GrupaData from "../types/grupa";

const Grupaadd: React.FC = () => {
    const [Error_nazwa_grupa, setError_nazwa_grupa] = useState<string>("");
    const [nazwa_grupa, setnazwa_grupa] = useState<string>("");
  const [isValid, setisValid] = useState<boolean>(false);
  const nazwa_grupa_regexp = RegExp(
    /^[A-Za-z][A-Za-z0-9_]{5,25}$/g
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    switch (name) {
      case "nazwa_grupa":
        console.log(name, value);
        if (value.length < 5 ||value.length > 25 ) {
            setError_nazwa_grupa("Nazwa grupy nie może mieć mniej niż 5 znaków i wiecej niż 25.");
            setnazwa_grupa(value)
          } else {
            setError_nazwa_grupa("");
            setisValid(true);
            setnazwa_grupa(value)
            if (!nazwa_grupa_regexp.test(value)) {
                setError_nazwa_grupa("Nie prawidłowy znak w nazwie grupy.");
                setnazwa_grupa(value)
              } else {
                setError_nazwa_grupa("");
                setisValid(true);
                setnazwa_grupa(value)
              }
          }

        break;

      default:
        break;
    }
    // let errors =
    // switch (name) {
    //   case 'nazwa_grupa':
    //      errors['nazwa_grupa'] = value.length < 5 ? 'Username must be 5 characters long!': '';
    //      break;

    //   default:
    //     break;
    // }
  };

  const addGrupa = (event:  React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isValid) {
      GrupyService.create(nazwa_grupa)
        .then((response: any) => {
          console.log("dodano:" + nazwa_grupa);
          console.log(response.data);

          window.location.reload();
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  };

  return (
    <>
      <Form onSubmit={addGrupa}>
        <div className="row p-2">
          <div className="col ">
            <input
              type="text"
              name="nazwa_grupa"
              id="nazwa_grupa"
              onChange={handleChange}
              value={nazwa_grupa}
              className={`form-control ${
                Error_nazwa_grupa != "" ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">{Error_nazwa_grupa}</div>
          </div>

          <div className="col container">
            <div className=" btn-group d-flex justify-content-center">
              <button className="btn btn-success " type="submit">Dodaj grupę </button>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};
export default Grupaadd;
