import React, { useState } from "react";
import axios from "axios";
import SearchResults from "./SearchResults";

const API_KEY = process.env.REACT_APP_API_KEY;

const SearchApp = () => {
    const [searchKey, setSearchKey] = useState("");
    const [teams, setTeams] = useState([]);
    const [sportTitle, setSportTitle] = useState("");
    const [error, setError] = useState(null);

    const fetchTeams = async () => {
        const API_URL = `https://api.the-odds-api.com/v4/sports/${searchKey}/scores/?daysFrom=1&apiKey=${API_KEY}`;

        try {
            const response = await axios.get(API_URL);
            const data = response.data;

            const teamSet = new Set();
            data.forEach((match) => {
                if (match.home_team) teamSet.add(match.home_team);
                if (match.away_team) teamSet.add(match.away_team);
            });

            setTeams(Array.from(teamSet).sort());
            setSportTitle(data[0]?.sport_title || searchKey);
            setError(null);
        } catch (err) {
            setError("Kunde inte hämta lag: " + err.message);
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchKey.trim() !== "") {
            fetchTeams();
        }
    };

  return (
    <div className="container mt-4">
        <h4>Exempel på sport_key:</h4>
        <ul>
            <li>basketball_nba</li>
            <li>americanfootball_nfl</li>
            <li>icehockey_nhl</li>
            <li>soccer_usa_mls</li>
        </ul>
        <form onSubmit={handleSubmit} className="mb-3">
            <input className="form-control" type="text" value={searchKey} placeholder="Skriv sport_key här..." onChange={(e) => setSearchKey(e.target.value)} />
            <button type="submit" className="btn btn-primary mt-2">
                Sök
            </button>
        </form>
      {error && <p className="text-danger">{error}</p>}

      {!error && sportTitle && (
        <h4 className="mt-4">Liga: {sportTitle}</h4>
      )}

      <SearchResults teams={teams} />
    </div>
  );
};

export default SearchApp;