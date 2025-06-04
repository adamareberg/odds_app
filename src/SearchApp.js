import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchResults from "./SearchResults";
import FavoritesCalendar from "./FavoritesCalendar";

const API_KEY = "7be7492e19cfdc33a319e574d508911e";
const API_URL = `https://api.the-odds-api.com/v4/sports/?apiKey=${API_KEY}`;

const SearchApp = () => {
  const [sports, setSports] = useState([]);
  const [error, setError] = useState(null);

  // Favoriter sparas i localStorage
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await axios.get(API_URL);
        setSports(response.data);
      } catch (err) {
        setError("Kunde inte hämta data: " + err.message);
      }
    };
    fetchSports();
  }, []);

  // LocalStorage 
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Sports Odds Finder</h2>
      <FavoritesCalendar favorites={favorites} />
      {error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <SearchResults
          sports={sports}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      )}
    </div>
  );
};

export default SearchApp;
