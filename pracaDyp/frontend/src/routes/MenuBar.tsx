import * as React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import { Link} from 'react-router-dom';
export default function MenuBar():JSX.Element  {
  return (
    <>  
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link to="/">Strona głowna</Link> 
  <button className="navbar-toggler" type="button" >
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
         <Link to="/konto"> <a className="nav-link" href="#">Konto</a></Link>
      </li>
     
      <li className="nav-item dropdown">
        <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" >
          konto
        </div>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <Link to="/login"> <a className="dropdown-item" href="#">Login</a></Link>
        <Link to="/rejestracja">  <a className="dropdown-item" href="#">rejestracja</a></Link>
          
        </div>
      </li>
      <li className="nav-item">
      <Link to="/dodaj"> <a className="nav-link " href="#">Dodaj</a></Link>
      </li>
    </ul>
    <form className="form-inline my-2 my-lg-0">
      {/* <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"> */}
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
  
   
       
          
        <hr />       
       
    </>
  )
}