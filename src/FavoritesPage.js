import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
  
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  return (
    <Container className="mt-3">
      <h2>Your Favorite Matches</h2>

      {favorites.length === 0 ? (
        <p>No favorites saved yet.</p>
      ) : (
        <ul>
          {favorites.map((fav) => (
            <li key={fav.id}>
              <strong>{fav.home_team}</strong> vs <strong>{fav.away_team}</strong>
              <br />
              <small>
                {new Date(fav.commence_time).toLocaleDateString()}{" "}
                {new Date(fav.commence_time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </small>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}

export default FavoritesPage;
