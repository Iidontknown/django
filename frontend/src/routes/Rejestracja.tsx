import * as React from 'react';
import { Link } from 'react-router-dom';
import MenuBar from './MenuBar';

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import IUser from '../types/user.type';
import { register } from '../services/auth.service';
import { useState } from 'react';

import { NavigateFunction, useNavigate } from 'react-router-dom';
const Rejestracja: React.FC = () => {

  const [errorBoolMessage, setErrorBoolMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  let navigate: NavigateFunction = useNavigate();


  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "Nazwa Uzytkownika > 3 < 20",
        (val: any) =>
          val &&
          val.toString().length >= 3 &&
          val.toString().length <= 20
      )
      .required("Pole Wymagane"),
    email: Yup.string()
      .email("Nie prawidłowy email")
      .required("Pole Wymagane"),
    password: Yup.string()
      .test(
        "len",
        "hasło 6 40",
        (val: any) =>
          val &&
          val.toString().length >= 6 &&
          val.toString().length <= 40
      )
      .required("Pole Wymagane"),
    password2: Yup.string()
      .test(
        "len",
        "hasło 6 40",
        (val: any) =>
          val &&
          val.toString().length >= 6 &&
          val.toString().length <= 40
      )
      .test(
        'password-match',
        'Nie takie same hasła',
        function (value) {
          return this.parent.password === value
        }
      )

      .required("pole wymagane"),
    regulamin: Yup.bool().oneOf([true], 'brak')

  });

  const handleRegister = (formValue: IUser) => {
    const { username, email, password } = formValue;
    console.log(username + email + password)
    register(username, email, password).then(
      (response) => {
        setMessage(response.data.message);
        setErrorBoolMessage(false);
        navigate("/");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setErrorBoolMessage(true);
      }
    );
  };


  return (
    <>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          password2: '',
          regulamin: false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}>
        <Form>
          <div className="container py-1 " >
            <div className="row d-flex justify-content-center align-items-center ">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card  text-white" style={{ backgroundColor: "#993333" }}>
                  <div className="card-body p-5 text-center">

                    <div className="mb-md-5 mt-md-4 pb-5">
                      <h2 className="fw-bold mb-2 text-uppercase">Rejestracja</h2>

                      <div className="form-outline form-white py-2">
                        <label className="form-label " >nazwa użytkownika</label>
                        <Field name="username" type="text" className="form-control form-control-lg" />
                        <ErrorMessage
                          name="username"
                          component="div"
                          className="alert alert-danger"
                        />
                        <div className='text-danger h-100' id='divName'></div>

                      </div>

                      <div className="form-outline form-white mb-4 ">
                        <label className="form-label" >Email</label>
                        <Field name="email" type="text" className="form-control form-control-lg" />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="alert alert-danger"
                        />
                        <div className='text-danger h-100' id='divError'></div>
                      </div>

                      <div className="form-outline form-white mb-4">
                        <label className="form-label" >Hasło</label>

                        <Field name="password" type="password" className="form-control form-control-lg" />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="alert alert-danger"
                        />
                        <div className='text-danger h-100' id='divError'></div>
                      </div>
                      <div className="form-outline form-white mb-4">
                        <label className="form-label" >Powtórz Hasło</label>

                        <Field name="password2" type="password" className="form-control form-control-lg" />
                        <ErrorMessage
                          name="password2"
                          component="div"
                          className="alert alert-danger"
                        />
                        <div className='text-danger h-100' id='divError'></div>
                      </div>
                      <div className="form-check form-white mb-4">
                        <label className="form-label" >Zaakceptuj regulamin</label>
                        <Field type="checkbox" name="regulamin" className="form-control form-control-lg" />
                        <ErrorMessage
                          name="regulamin"
                          component="div"
                          className="alert alert-danger"
                        />
                        <div className='text-danger h-100' id='divError'></div>
                      </div>

                      <button className="btn btn-outline-light btn-lg px-5" type="submit">Zarajestruj się</button>
                      {message?
                      <>
                      <div
                        className={
                          errorBoolMessage ? "alert alert-danger" : "alert alert-success"
                        }
                        role="alert"
                      >
                        {message}
                      </div></>:<></>
                      }
                    </div>

                    <div>
                      <button className="mb-0 btn btn-outline-light btn-lg px-5">  <a href="zalogujsie" className="text-white fw-bold">Zaloguj się</a>
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  )
}
export default Rejestracja;