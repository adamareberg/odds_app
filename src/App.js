import SearchApp from "./SearchApp";
import SearchResults from "./SearchResults";
import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 
function App() {

  return (
    <div className="app-container">
      <Navbar expand="lg" className="bg-primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Sport-Odds App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#favourties">Favourites</Nav.Link>
              <NavDropdown title="Sports" id="basic-nav-dropdown">
                <NavDropdown.Item href="#Soccer">Soccer</NavDropdown.Item>
                <NavDropdown.Item href="#American Football">American Football</NavDropdown.Item>
                <NavDropdown.Item href="#Baseball">Baseball</NavDropdown.Item>
                <NavDropdown.Item href="#Basketball">Basketball</NavDropdown.Item>
                <NavDropdown.Item href="#Boxing">Boxing</NavDropdown.Item>
                <NavDropdown.Item href="#Cricket">Cricket</NavDropdown.Item>
                <NavDropdown.Item href="#Golf">Golf</NavDropdown.Item>
                <NavDropdown.Item href="#Ice Hockey">Ice Hockey</NavDropdown.Item>
                <NavDropdown.Item href="#Mixed Martial Arts">Mixed Martial Arts</NavDropdown.Item>
                <NavDropdown.Item href="#Lacrosse">Lacrosse</NavDropdown.Item>
                <NavDropdown.Item href="#Rugby League">Rugby League</NavDropdown.Item>
                <NavDropdown.Item href="#Tennis">Tennis</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-3">
        <SearchApp />
        <div className="mt-4">
          <h2>Today's Matches</h2>
        </div>
      </Container>
    </div>
  );
}
  


export default App;
