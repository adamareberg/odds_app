import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((f) => f.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  if (favorites.length === 0) {
    return (
      <Container className="mt-3">
        <h2>Your Favorites</h2>
        <p>No favorites saved yet.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-3">
      <h2>Your Favorites</h2>

      <ul className="list-unstyled">
        {favorites.map((fav) => {
          if (fav.type === "league") {
            return (
              <li key={fav.id} className="mb-3">
                <strong>League:</strong> {fav.title}
                {fav.group ? (
                  <span> &mdash; {fav.group}</span>
                ) : null}
                <div>
                  <button
                    className="btn btn-sm btn-outline-danger mt-2"
                    onClick={() => removeFavorite(fav.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            );
          }
          if (fav.type === "team") {
            return (
              <li key={fav.id} className="mb-3">
                <strong>Team:</strong> {fav.team}
                {fav.leagueTitle ? (
                  <span className="text-muted"> &mdash; {fav.leagueTitle}</span>
                ) : null}
                {fav.group ? (
                  <span className="text-muted"> ({fav.group})</span>
                ) : null}
                <div>
                  <button
                    className="btn btn-sm btn-outline-danger mt-2"
                    onClick={() => removeFavorite(fav.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            );
          }

          return (
            <li key={fav.id} className="mb-3">
              <strong>{fav.home_team}</strong> vs{" "}
              <strong>{fav.away_team}</strong>
              <br />
              {fav.commence_time && (
                <small>
                  {new Date(fav.commence_time).toLocaleDateString()}{" "}
                  {new Date(fav.commence_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </small>
              )}
              <div>
                <button
                  className="btn btn-sm btn-outline-danger mt-2"
                  onClick={() => removeFavorite(fav.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}

export default FavoritesPage;

