import * as React from 'react';
import { Link} from 'react-router-dom';
import MenuBar from './MenuBar';
export default function Login():JSX.Element  {
  return (
    <> 
    <MenuBar/>
    <div className="container py-1 " >
    <div className="row d-flex justify-content-center align-items-center ">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card  text-white"  style={{backgroundColor: "#993333"}}>
          <div className="card-body p-5 text-center">

            <div className="mb-md-5 mt-md-4 pb-5">

              <h2 className="fw-bold mb-2 text-uppercase">Logowanie</h2>

              <div className="form-outline form-white mb-4 py-2">
                <input type="email" id="inputEmail" className="form-control form-control-lg" />
                <label className="form-label" >Email</label>
              </div>

              <div className="form-outline form-white mb-4">
                <input type="password" id="inputPassword" className="form-control form-control-lg" />
                <label className="form-label" >Hasło</label>
              </div>

              <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Zapomiałem hasło</a></p>

              <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>

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
      </>
  )
}