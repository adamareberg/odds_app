import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const FavoritesCalendar = ({ favorites }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Filtrera matcher på valt datum
  const matchesOnSelectedDate = favorites.filter(fav => {
    const matchDate = new Date(fav.commence_time);
    return (
      matchDate.getFullYear() === selectedDate.getFullYear() &&
      matchDate.getMonth() === selectedDate.getMonth() &&
      matchDate.getDate() === selectedDate.getDate()
    );
  });

  return (
    <div className="mb-4">
      <h4>Kalender med sparade matcher</h4>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
      />
      <div className="mt-3">
        <h5>Matcher {selectedDate.toLocaleDateString()}</h5>
        {matchesOnSelectedDate.length === 0 ? (
          <p>Inga sparade matcher detta datum.</p>
        ) : (
            <ul>
            {matchesOnSelectedDate.map(match => (
              <li key={match.id}>
                <strong>{match.home_team}</strong> vs <strong>{match.away_team}</strong><br />
                <small>
                  Starttid: {new Date(match.commence_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </small>
                {match.odds && match.odds.length > 0 && (
                  <ul>
                    {match.odds.map((outcome, i) => (
                      <li key={i}>
                        {outcome.name}: {outcome.price}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          
        )}
      </div>
    </div>
  );
};

export default FavoritesCalendar;
