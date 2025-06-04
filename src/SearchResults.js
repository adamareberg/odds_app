import React from "react";

const SearchResults = ({ teams }) => {
  if (!teams.length) return <p>Laddar sportdata...</p>;

  return (
    <ul className="list-group">
      {teams.map((team) => (
        <li key={team.key} className="list-group-item">
          <strong>Lag:</strong> {team} <br />
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;