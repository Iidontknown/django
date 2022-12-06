import React, {  useState } from "react";
import GrupyService from "../services/GrupyService";
import GrupaData from "../types/grupa";
import GrupaUserchangeDelate from "./GrupaUserchangeDelate";

function GrupachangeDelate({ id, nazwa_grupa }: GrupaData) {
  const [Error_nazwa_grupa, setError_nazwa_grupa] = useState<string>("");
  const [nazwa_grupa_input, setnazwa_grupa_input] =
    useState<string>(nazwa_grupa);

  const [ZmienNazwe_input, setZmienNazwe_input] = useState<boolean>();
  const [isValid, setisValid] = useState<boolean>(true);
  const nazwa_grupa_regexp = RegExp(/^[A-Za-z][A-Za-z0-9_]{5,25}$/g);

  const changeRow = () => {
console.log('asdsad'+id)
    if (isValid) {
      const confirmBox = window.confirm(
        "Czy zmienić nazwę grupy na:" + nazwa_grupa_input
      );
      if (confirmBox === true) {
        GrupyService.change_id(nazwa_grupa_input, id)
          .then((response: any) => {
            window.alert("Zmieniono");
            console.log(response.data);

            // window.location.reload();
          })
          .catch((e: Error) => {
            console.log(e);
          });
      }
    }
  };

  const deleteRow = (id: number, nazwa_grupa: string) => {
    const confirmBox = window.confirm("Czy usunąć grupę:" + nazwa_grupa);
    if (confirmBox === true) {
      GrupyService.delete_id(id)
        .then((response: any) => {
          window.alert("Usuniento");
          console.log(response.data);

          // window.location.reload();
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    switch (name) {
      case "nazwa_grupa":
        console.log(name, value);
        if (value.length < 5 || value.length > 25) {
          setError_nazwa_grupa(
            "Nazwa grupy nie może mieć mniej niż 5 znaków i wiecej niż 25."
          );
          setnazwa_grupa_input(value);
        } else {
          setError_nazwa_grupa("");
          setisValid(true);
          setnazwa_grupa_input(value);
          if (!nazwa_grupa_regexp.test(value)) {
            setError_nazwa_grupa("Nie prawidłowy znak w nazwie grupy.");
            setnazwa_grupa_input(value);
          } else {
            setError_nazwa_grupa("");
            setisValid(true);
            setnazwa_grupa_input(value);
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

  const changeGrupa = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("dupa");
    if (isValid) {
      console.log("dupa");
    }
  };

  return (
    <>
        <div className="row p-2 pt-5">
          <div className="col ">
            {ZmienNazwe_input ? (
              <input
                type="text"
                name="nazwa_grupa"
                id="nazwa_grupa"
                onChange={handleChange}
                value={nazwa_grupa_input}
                className={`form-control ${
                  Error_nazwa_grupa != "" ? "is-invalid" : ""
                }`}
              />
            ) : (
              <p>{nazwa_grupa_input}</p>
            )}

            <div className="invalid-feedback">{Error_nazwa_grupa}</div>
          </div>

          <div className="col ">
            <div className=" btn-group d-flex justify-content-center">
              {ZmienNazwe_input ? (
                <button className="btn btn-success p-1 " onClick={() =>changeRow()} >
                  Zaakceptuj{" "}
                </button>
              ) : (
                <button
                  className="btn btn-warning p-1 "
                  onClick={() => setZmienNazwe_input(true)}
                >
                  Zmień nazwę{" "}
                </button>
              )}

              <button
                className="btn btn-danger p-1"
                type="submit"
                onClick={() => deleteRow(id, nazwa_grupa)}
              >
                Usuń grupę
              </button>
            </div>
          </div>
        </div>
        <GrupaUserchangeDelate {...id} ></GrupaUserchangeDelate>
    </>
  );
}
export default GrupachangeDelate;
