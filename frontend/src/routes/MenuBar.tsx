import * as React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import { Link, NavigateFunction, useNavigate} from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import { getCurrentUser, logout } from '../services/auth.service';
const currentUser = getCurrentUser();

const  MenuBar: React.FC = () => {
  let navigate: NavigateFunction = useNavigate();
  const wylogujsie = () =>{
    logout()
    navigate("/");
        window.location.reload();
  }
  return (
    <>  
 <Navbar  expand="lg " style={{backgroundColor: "#993333"}} >
  <Container>
    <Navbar.Brand href="/" className='text-white'>Katalog</Navbar.Brand>
    <Navbar.Toggle/>
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/" className='text-white'>Strona główna</Nav.Link>
        {currentUser && (<>
        <Nav.Link href="/konto" className='text-white'>Konto</Nav.Link>
        <Nav.Link href="/katalog"className='text-white'>Zarządzaj Katalogami</Nav.Link>
        <NavDropdown title="Admin" id="basic-nav-dropdown"className='text-white'>
          <NavDropdown.Item href="/admin/user">Uzytkownicy</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="/admin/katalog">Katalogi</NavDropdown.Item>
        </NavDropdown>
        
        <Nav.Link  onClick={wylogujsie} className='text-white'>Wyloguj się</Nav.Link>
        </>
        )}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    </>
  )
}
export default MenuBar;