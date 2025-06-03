import React from "react";
import League from "./League";
import Team from "./Team";

export default function SearchResults({ leagues, teams }) {
  return (
    <ul className="list-group">
      {leagues.map((league, index) => (
        <League key={index} item={league} />
      ))}
      {teams.map((team, index) => (
        <Team key={index} item={team} />
      ))}
    </ul>
  );
}