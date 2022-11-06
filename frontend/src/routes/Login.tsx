import * as React from 'react';
import { Link, NavigateFunction, useNavigate} from 'react-router-dom';
import MenuBar from './MenuBar';
import { ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from "yup";
import { login } from '../services/auth.service';
import { useState } from 'react';
type Props = {}

const Login: React.FC<Props> = () => {
  let navigate: NavigateFunction = useNavigate();
  
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initialValues: {
    username: string;
    password: string;
  } = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Pole wymagane"),
    password: Yup.string().required("Pole wymagane"),
  });
  
  const sendLogin = (formValue:{username:string; password:string})=>{
   const { username,password}=formValue
   console.log(username+ password)
 
    login(username, password).then(
      () => {

        navigate("/konto");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );

  }

  return (
    <> 
    <MenuBar/>
    <Formik 
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={sendLogin}
    >
      <Form>
    <div className="container py-1 " >
    <div className="row d-flex justify-content-center align-items-center ">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card  text-white"  style={{backgroundColor: "#993333"}}>
          <div className="card-body p-5 text-center">

            <div className="mb-md-5 mt-md-4 pb-5">

              <h2 className="fw-bold mb-2 text-uppercase">Logowanie</h2>

              <div className="form-outline form-white mb-4 py-2">
                
              <label className="form-label" >Email</label>
                <Field type="text" name="username" className="form-control form-control-lg" />
                <ErrorMessage
                          name="username"
                          component="div"
                          className="alert alert-danger"
                        />
              </div>

              <div className="form-outline form-white mb-4">
                
              <label className="form-label" >Hasło</label>
                <Field type="password" name="password" className="form-control form-control-lg" />
                <ErrorMessage
                          name="password"
                          component="div"
                          className="alert alert-danger"
                        />
              </div>

              <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Zapomiałem hasło</a></p>

              <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
              {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            </div>

            <div>
              <p className="mb-0">  <a href="rejestracja" className="text-white fw-bold">Zarajestruj się</a>
              </p>
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

export default Login;