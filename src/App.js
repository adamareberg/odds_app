import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import SearchApp from "./SearchApp";
import FavoritesPage from "./FavoritesPage";
import SportsPage from "./SportsPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [favoriteMatches, setFavoriteMatches] = useState([]);

  useEffect(() => {
    const fetchFavoriteMatches = async () => {
      try {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const leagueFavorites = favorites.filter((f) => f.type === "league");
        const teamFavorites = favorites.filter((f) => f.type === "team");

        const today = new Date();
        const startDate = today.toISOString().split("T")[0];


        const matches = [];


        for (const league of leagueFavorites) {
          try {
            const url = `https://api.the-odds-api.com/v4/sports/${league.key}/events?apiKey=${API_KEY}&date=${startDate}`;
            const { data } = await axios.get(url);
            (data || []).forEach((event) => {
              matches.push({
                ...event,
                leagueTitle: league.title,
                group: league.group,
              });
            });
          } catch (error) {
            console.error(`Failed to fetch events for league ${league.key}`, error);
          }
        }


        const teamMatches = [];
        for (const team of teamFavorites) {
          try {
            const url = `https://api.the-odds-api.com/v4/sports/${team.leagueKey}/events?apiKey=${API_KEY}&date=${startDate}`;
            const { data } = await axios.get(url);
            (data || [])
              .filter(
                (event) =>
                  event.home_team === team.team || event.away_team === team.team
              )
              .forEach((event) => {
                teamMatches.push({
                  ...event,
                  leagueTitle: team.leagueTitle,
                  group: team.group,
                });
              });
          } catch (error) {
            console.error(
              `Failed to fetch events for team ${team.team} in league ${team.leagueKey}`,
              error
            );
          }
        }

        const uniqueMatches = Array.from(
          new Map(
            [...matches, ...teamMatches].map((m) => [m.id, m])
          ).values()
        );

        setFavoriteMatches(uniqueMatches);
      } catch (error) {
        console.error("Failed to fetch favorite matches", error);
      }
    };

    fetchFavoriteMatches();
  }, []);

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
                <NavDropdown.Item as={Link} to="/sports/soccer">
                  Soccer
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/sports/american football">
                  American Football
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/sports/baseball">
                  Baseball
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/sports/basketball">
                  Basketball
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/sports/boxing">
                  Boxing
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/sports/cricket">
                  Cricket
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/sports/golf">
                  Golf
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/sports/ice hockey">
                  Ice Hockey
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/sports/mixed martial arts">
                  Mixed Martial Arts
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/sports/lacrosse">
                  Lacrosse
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/sports/rugby league">
                  Rugby League
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/sports/tennis">
                  Tennis
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-3">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchApp />
                <div className="mt-4">
                  <h2>Today's Favorite Matches</h2>
                  {favoriteMatches.length === 0 ? (
                    <p className="text-muted">
                      No matches for your favorite leagues or teams today.
                    </p>
                  ) : (
                    <ul className="list-unstyled">
                      {favoriteMatches.map((match) => (
                        <li key={match.id} className="mb-3">
                          <strong>{match.home_team}</strong> vs{" "}
                          <strong>{match.away_team}</strong>
                          <br />
                          <small>
                            {match.leagueTitle} ({match.group})
                          </small>
                          <br />
                          <small>
                            {new Date(match.commence_time).toLocaleDateString()}{" "}
                            {new Date(match.commence_time).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </small>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            }
          />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/sports/:sportName" element={<SportsPage />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;