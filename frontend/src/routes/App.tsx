import * as React from 'react';
import { Link} from 'react-router-dom';
import MenuBar from './MenuBar';
export default function App():JSX.Element  {
  return (
    <> 
      <div className="container">
     
    <div className="row align-items-md-stretch pt-5">
    <div className="col-md-6">
        <div className="h-100 p-5 bg-light border rounded-3">
          <h2>Logowanie</h2>
          <p>pamietaj żę przy pomocy klonta możesz zapisywać numery cześci</p>
          <Link to="login"><button className="btn btn-outline-secondary" type="button">Zaloguj się</button></Link>
        </div>
      </div>
      <div className="col-md-6">
        <div className="h-100 p-5 bg-light border rounded-3">
          <h2>Zarejestruj się </h2>
          <p>Poznaj korzyści z posaidania konta u nas.</p>
          <Link to="/rejestracja"><button className="btn btn-outline-secondary" type="button">Zarejestruj się</button> </Link>
        </div>
      </div>
    </div>

    
      </div>   
      </>
  )
}