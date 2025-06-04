import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import SearchResults from "./SearchResults";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = `https://api.the-odds-api.com/v4/sports/?apiKey=${API_KEY}`;

const SearchApp = () => {
  const [sports, setSports] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <div className="container mt-4">
      {error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <SearchResults sports={sports} />
      )}
    </div>
  );
};

export default SearchApp;