import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchResults from "./SearchResults";
import FavoritesCalendar from "./FavoritesCalendar";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = `https://api.the-odds-api.com/v4/sports/?apiKey=${API_KEY}`;

const SearchApp = () => {
  const [sports, setSports] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredSports = sports.filter((sport) =>
    sport.group.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sport.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-container">
      <h2 className="search-header">Sports Odds Finder</h2>
      <div className="d-flex justify-content-end">
        <div className="position-relative" style={{ width: '50%' }}>
            <input className="form-control search-input" type="text" placeholder="Sök sport eller liga..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            {searchTerm.trim() !== "" && (
                <div className="results-dropdown">
                    <SearchResults
                    sports={filteredSports}
                    favorites={favorites}
                    setFavorites={setFavorites}
                    />
                </div>
            )}
        </div>
      </div> 

      <FavoritesCalendar favorites={favorites} />

      
      {error ? (
        <p className="text-danger">{error}</p>
      ): null}
    </div>
  );
};

export default SearchApp;


// <div className="search-results-dropdown" style={{ textAlign: "center", zIndex: 1000, maxHeight: "300px", overflowY: "auto" }}