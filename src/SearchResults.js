import React, { useState } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

const SearchResults = ({ sports, favorites, setFavorites }) => {
  const [odds, setOdds] = useState({});
  const [loading, setLoading] = useState({});
  const [error, setError] = useState({});

  const fetchOdds = async (sportKey) => {
    setLoading((prev) => ({ ...prev, [sportKey]: true }));
    setError((prev) => ({ ...prev, [sportKey]: null }));

    try {
      const response = await axios.get(
        `https://api.the-odds-api.com/v4/sports/${sportKey}/odds/?apiKey=${API_KEY}&regions=eu&markets=h2h`
      );
      setOdds((prev) => ({ ...prev, [sportKey]: response.data }));
    } catch (err) {
      setError((prev) => ({
        ...prev,
        [sportKey]: "Kunde inte hämta odds: " + err.message,
      }));
    }
    setLoading((prev) => ({ ...prev, [sportKey]: false }));
  };

  const addFavorite = (match) => {
    if (!favorites.some(fav => fav.id === match.id)) {
      // Save only the odds for the main market and first bookmaker
      let odds = [];
      if (
        match.bookmakers &&
        match.bookmakers[0] &&
        match.bookmakers[0].markets[0] &&
        match.bookmakers[0].markets[0].outcomes
      ) {
        odds = match.bookmakers[0].markets[0].outcomes.map(outcome => ({
          name: outcome.name,
          price: outcome.price,
        }));
      }
  
      setFavorites([...favorites, {
        ...match,
        odds // Add odds array to the saved favorite
      }]);
    }
  };
  

  if (!sports.length) return <p>Laddar sportdata...</p>;

  return (
    <ul className="list-group">
      {sports.map((sport) => (
        <li key={sport.key} className="result-item">
          <strong>Sport:</strong> {sport.group} <br />
          <strong>Liga:</strong> {sport.title}
          <br />
          <button
            className="btn btn-primary btn-sm mt-2"
            onClick={() => fetchOdds(sport.key)}
            disabled={loading[sport.key]}
          >
            {loading[sport.key] ? "Laddar odds..." : "Visa odds"}
          </button>
          {error[sport.key] && (
            <div className="text-danger">{error[sport.key]}</div>
          )}
          {odds[sport.key] && odds[sport.key].length > 0 && (
            <ul>
              {odds[sport.key].map((match) => (
                <li key={match.id} className="d-flex flex-column mb-2">
                  <span>
                    <strong>{match.home_team}</strong> vs <strong>{match.away_team}</strong>
                    <br />
                    <small>
                      Starttid:{" "}
                      {new Date(match.commence_time).toLocaleString()}
                    </small>
                  </span>
                  <button
                    className="btn btn-sm btn-outline-success mt-1"
                    onClick={() => addFavorite(match)}
                    disabled={favorites.some(fav => fav.id === match.id)}
                  >
                    {favorites.some(fav => fav.id === match.id)
                      ? "Favorit"
                      : "Spara i kalender"}
                  </button>
                  {match.bookmakers &&
                    match.bookmakers[0] &&
                    match.bookmakers[0].markets[0] &&
                    match.bookmakers[0].markets[0].outcomes.map((outcome) => (
                      <div key={outcome.name} className="match-odds">
                        {outcome.name}: {outcome.price}
                      </div>
                    ))}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
