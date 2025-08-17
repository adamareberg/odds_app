
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Accordion } from 'react-bootstrap';

const API_KEY = process.env.REACT_APP_API_KEY;

function SportsPage() {
  const { sportName } = useParams();
  const [leagues, setLeagues] = useState([]);
  const [teamsByLeague, setTeamsByLeague] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const url = `https://api.the-odds-api.com/v4/sports/?apiKey=${API_KEY}`;
        const { data } = await axios.get(url);
        const sportLeagues = (data || []).filter(
          (s) => (s.group || "").toLowerCase() === sportName.toLowerCase()
        );
        setLeagues(sportLeagues);
      } catch (error) {
        console.error("Failed to fetch sports data", error);
      }
    })();
  }, [sportName]);

  const handleLeagueClick = async (leagueKey) => {
    if (teamsByLeague[leagueKey]) {
      return;
    }

    try {
      const url = `https://api.the-odds-api.com/v4/sports/${leagueKey}/events?apiKey=${API_KEY}`;
      const { data } = await axios.get(url);
      const uniq = new Set();
      (data || []).forEach((ev) => {
        if (ev?.home_team) uniq.add(ev.home_team);
        if (ev?.away_team) uniq.add(ev.away_team);
      });

      setTeamsByLeague((prev) => ({
        ...prev,
        [leagueKey]: Array.from(uniq).sort((a, b) => a.localeCompare(b)),
      }));
    } catch (error) {
      console.error("Failed to fetch league data", error);
      setTeamsByLeague((prev) => ({
        ...prev,
        [leagueKey]: ['Error: Failed to fetch data'],
      }));
    }
  };


  return (
    <div>
      <h1>{sportName.toUpperCase()}</h1>
      <Accordion className="dark-accordion">
        {leagues.map((league) => (
          <Accordion.Item eventKey={league.key} key={league.key}>
            <Accordion.Header onClick={() => handleLeagueClick(league.key, league.title)}>
              {league.title}
            </Accordion.Header>
            <Accordion.Body>
              {teamsByLeague[league.key] && (
                <ul>
                  {(teamsByLeague[league.key] || []).map((team) => (
                    <li key={team}>{team}</li>
                  ))}
                </ul>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}

export default SportsPage;
