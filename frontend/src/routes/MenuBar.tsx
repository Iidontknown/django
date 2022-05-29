import * as React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import { Link} from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
export default function MenuBar():JSX.Element  {
  return (
    <>  
 <Navbar  expand="lg " style={{backgroundColor: "#993333"}} >
  <Container>
    <Navbar.Brand href="/" className='text-white'>Katalog</Navbar.Brand>
    <Navbar.Toggle/>
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/" className='text-white'>Strona główna</Nav.Link>
        <Nav.Link href="/konto" className='text-white'>Konto</Nav.Link>
        <Nav.Link href="/katalog"className='text-white'>Zarządzaj Katalogami</Nav.Link>
        <NavDropdown title="Admin" id="basic-nav-dropdown"className='text-white'>
          <NavDropdown.Item href="/admin/user">Uzytkownicy</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="/admin/katalog">Katalogi</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    </>
  )
}