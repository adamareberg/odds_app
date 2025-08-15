import SearchApp from "./SearchApp";
import FavoritesPage from "./FavoritesPage";
import SportsPage from "./SportsPage";
import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import {Routes, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 
function App() {

  return (
    <div className="app-container">
      <Navbar expand="lg" className="bg-primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Sport-Odds App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/favorites">Favorites</Nav.Link>
              <NavDropdown title="Sports" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/sports/soccer">Soccer</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/sports/american football">American Football</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/sports/baseball">Baseball</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/sports/basketball">Basketball</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/sports/boxing">Boxing</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/sports/cricket">Cricket</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/sports/golf">Golf</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/sports/ice hockey">Ice Hockey</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/sports/mixed martial arts">Mixed Martial Arts</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/sports/lacrosse">Lacrosse</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/sports/rugby league">Rugby League</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/sports/tennis">Tennis</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-3">
        <Routes>
          <Route path="/" element={
            <>
              <SearchApp />
              <div className="mt-4">
                <h2>Today's Matches</h2>
              </div>
            </>
          } />
          <Route path="/favorites" element={<FavoritesPage />}/>
          <Route path="/sports/:sportName" element={<SportsPage />}/>
        </Routes>
      </Container>



    </div>
  );
}
  


export default App;
