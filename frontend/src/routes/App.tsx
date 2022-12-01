import * as React from 'react';
import { Link} from 'react-router-dom';
import MenuBar from './MenuBar';
export default function App():JSX.Element  {
  return (
    <> 
      <div className="container">
      <div className="p-5 mb-4 bg-light rounded-3">
      <div className="container-fluid py-5">
        <h1 className="display-5 fw-bold">Wyszukaj</h1>
        <div className="input-group mb-3">
  <div className="input-group-prepend">
    <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Model</button>
    <div className="dropdown-menu">
      <a className="dropdown-item" href="#">Nr częsci</a>
      <a className="dropdown-item" href="#">Nr seryjny</a>
      <a className="dropdown-item" href="#">Słowo kluczowe</a>
    </div>
  </div>
  <input type="text" className="form-control" aria-label="Text input with dropdown button"></input>
</div>
        <button className="btn btn-primary btn-lg btn-block" type="button">Wyszukaj</button>
      </div>
    </div> 
    <div className="row align-items-md-stretch">
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