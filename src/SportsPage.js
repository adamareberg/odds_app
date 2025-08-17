import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Accordion } from "react-bootstrap";

const API_KEY = process.env.REACT_APP_API_KEY;

function SportsPage() {
  const { sportName } = useParams();
  const [leagues, setLeagues] = useState([]);
  const [teamsByLeague, setTeamsByLeague] = useState({});

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favorites")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    (async () => {
      try {
        const url = `https://api.the-odds-api.com/v4/sports/?apiKey=${API_KEY}`;
        const { data } = await axios.get(url);
        const sportLeagues = (data || []).filter(
          (s) => (s.group || "").toLowerCase() === sportName.toLowerCase(),
        );
        setLeagues(sportLeagues);
      } catch (error) {
        console.error("Failed to fetch sports data", error);
      }
    })();
  }, [sportName]);

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (e) {
      console.error("Failed to persist favorites", e);
    }
  }, [favorites]);

  const handleLeagueClick = async (leagueKey) => {
    if (teamsByLeague[leagueKey]) return;

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
        [leagueKey]: ["Error: Failed to fetch data"],
      }));
    }
  };

  const leagueId = (league) => `league:${league.key}`;
  const teamId = (leagueKey, teamName) => `team:${leagueKey}|${teamName}`;

  const isLeagueSaved = (league) =>
    favorites.some((f) => f.type === "league" && f.id === leagueId(league));

  const isTeamSaved = (leagueKey, teamName) =>
    favorites.some(
      (f) => f.type === "team" && f.id === teamId(leagueKey, teamName),
    );

  const saveLeague = (league) => {
    if (isLeagueSaved(league)) return;
    const item = {
      type: "league",
      id: leagueId(league),
      key: league.key,
      title: league.title,
      group: league.group,
    };
    setFavorites((prev) => [...prev, item]);
  };

  const saveTeam = (league, teamName) => {
    if (isTeamSaved(league.key, teamName)) return;
    const item = {
      type: "team",
      id: teamId(league.key, teamName),
      team: teamName,
      leagueKey: league.key,
      leagueTitle: league.title,
      group: league.group,
    };
    setFavorites((prev) => [...prev, item]);
  };

  return (
    <div>
      <h1>{sportName.toUpperCase()}</h1>
      <Accordion className="dark-accordion">
        {leagues.map((league) => (
          <Accordion.Item eventKey={league.key} key={league.key}>
            <Accordion.Header onClick={() => handleLeagueClick(league.key)}>
              <div className="d-flex align-items-center gap-2">
                <span>{league.title}</span>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-success ms-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    saveLeague(league);
                  }}
                  disabled={isLeagueSaved(league)}
                >
                  {isLeagueSaved(league) ? "Saved League" : "Save League"}
                </button>
              </div>
            </Accordion.Header>

            <Accordion.Body>
              {teamsByLeague[league.key] && (
                <>
                  <h5 className="mb-2">Teams</h5>
                  <ul className="list-unstyled">
                    {(teamsByLeague[league.key] || []).map((team) => (
                      <li
                        key={team}
                        className="d-flex align-items-center justify-content-between mb-2"
                      >
                        <span>{team}</span>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => saveTeam(league, team)}
                          disabled={isTeamSaved(league.key, team)}
                        >
                          {isTeamSaved(league.key, team)
                            ? "Saved Team"
                            : "Save Team"}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {!teamsByLeague[league.key] && (
                <p className="text-muted">Loading teams…</p>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}

export default SportsPage;

