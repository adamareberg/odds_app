import React, { useState, useRef, useEffect } from "react";
import League from './League'
import Team from './Team'
import axios from "axios";

export default function SearchApp() {
    const [sports] = useState(["Football", "Basketball", "Baseball", "Hockey", "Cricket", "Fighting", "Soccer"]);
    const [selectedSport, setSelectedSport] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [leagues, setLeagues] = useState([]);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        if (!selectedSport || searchTerm.length < 2) return;

        const fetchData = async () => {
            try {
                const response = await axios.get(
                "https://therundown-therundown-v1.p.rapidapi.com/sports",
                {
                    headers: {
                    'x-rapidapi-key': process.env.REACT_APP_API_KEY,
                    'x-rapidapi-host': 'therundown-therundown-v1.p.rapidapi.com'
                    },
                }
                );

                console.log("API-svar:", response.data);

                setLeagues(response.data?.leagues || []);
                setTeams(response.data?.teams || []);
            } catch (error) {
                console.error("API error:", error);
                setLeagues([]);
                setTeams([]);
            }
            };

        fetchData();
    }, [searchTerm, selectedSport]);

    return (
        <div className="container mt-4">
            <div className="mb-3">
                {sports.map((sport) => (
                    <button className={`btn me-2 ${selectedSport === sport ? "btn-primary" : "btn-outlisene-primary"}`} key={sport} onClick={() => setSelectedSport(sport)}>
                        {sport}
                    </button>
                ))}
            </div>
            {selectedSport && (
            <div>
                <input className="form-control" type="text" placeholder={`Search for league or team in ${selectedSport}...`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
        )}
        </div>
    );
}