
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

function SportsPage() {
  const { sportName } = useParams();
  const [allSports, setAllSports] = useState([]);
  const [leagueState, setLeagueState] = useState({});

  useEffect(() => {
    (async () => {
      const url = `https://api.the-odds-api.com/v4/sports/?apiKey=${API_KEY}`;
      const { data } = await axios.get(url);
      setAllSports(Array.isArray(data) ? data : []);
    })();
  }, []);

  const leagues = allSports.filter(
    (s) => (s.group || "").toLowerCase() === sportName.toLowerCase()
  );

  useEffect(() => {
    leagues.forEach((league) => {
      const key = league.key;
      if (leagueState[key]?.length) return;
      (async () => {
        const url = `https://api.the-odds-api.com/v4/sports/${key}/events?apiKey=${API_KEY}`;
        const { data } = await axios.get(url);
        const uniq = new Set();
        (data || []).forEach((ev) => {
          if (ev?.home_team) uniq.add(ev.home_team);
          if (ev?.away_team) uniq.add(ev.away_team);
        });
        setLeagueState((prev) => ({
          ...prev,
          [key]: Array.from(uniq).sort((a, b) => a.localeCompare(b)),
        }));
      })();
    });
  }, [leagues, leagueState]);

  return (
    <div>
      <h1>{sportName.toUpperCase()}</h1>
      {leagues.map((league) => (
        <div key={league.key} style={{ marginBottom: "1rem" }}>
          <h3>{league.title}</h3>
          <ul>
            {(leagueState[league.key] || []).map((team) => (
              <li key={team}>{team}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default SportsPage;