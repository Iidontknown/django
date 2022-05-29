import * as React from 'react';
import { Link} from 'react-router-dom';
import MenuBar from './MenuBar';
export default function Rejestracja():JSX.Element  {
  return (
    <> 
    <MenuBar/>
    <div className="container py-1 " >
    <div className="row d-flex justify-content-center align-items-center ">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card  text-white"  style={{backgroundColor: "#112111"}}>
          <div className="card-body p-5 text-center">

            <div className="mb-md-5 mt-md-4 pb-5">
            <h2 className="fw-bold mb-2 text-uppercase">Rejestracja</h2>

<div className="form-outline form-white py-2">
  <label className="form-label " >nazwa użytkownika</label>
  <input type="text" id="inputName"  className="form-control form-control-lg "  />
  <div className='text-danger h-100' id='divName'></div>
 
</div>

              <div className="form-outline form-white mb-4 ">
                <label className="form-label" >Email</label>
                <input type="email" id="inputEmail" className="form-control form-control-lg" />
                
  <div className='text-danger h-100' id='divError'></div>
              </div>

              <div className="form-outline form-white mb-4">
                <label className="form-label" >Hasło</label>
                <input type="password" id="inputPassword" className="form-control form-control-lg" />
  <div className='text-danger h-100' id='divError'></div>
              </div>
              <div className="form-outline form-white mb-4">
                <label className="form-label" >Powtórz Hasło</label>
                <input type="password" id="inputPassword" className="form-control form-control-lg" />
  <div className='text-danger h-100' id='divError'></div>
              </div>
              <div className="form-check form-white mb-4">
                <label className="form-label" >Zaakceptuj regulamin</label>
                <input type="checkbox" id="inputPassword" className="form-control form-control-lg" />
  <div className='text-danger h-100' id='divError'></div>
              </div>

              <button className="btn btn-outline-light btn-lg px-5" type="submit">Zarajestruj się</button>

            </div>

            <div>
              <p className="mb-0">  <a href="zalogujsie" className="text-white fw-bold">Zaloguj się</a>
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