import React from "react";

const SearchResults = ({ sports }) => {
  if (!sports.length) return <p>Laddar sportdata...</p>;

  return (
    <ul className="list-group">
      {sports.map((sport) => (
        <li key={sport.key} className="list-group-item">
          <strong>Sport:</strong> {sport.group} <br />
          <strong>Liga:</strong> {sport.title}
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;