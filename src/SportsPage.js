
import React from 'react';
import { useParams } from 'react-router-dom';

function SportsPage() {
  const { sportName } = useParams();
  
  return (
    <div>
      <h1>{sportName.toUpperCase()}</h1>
    </div>
  );
}

export default SportsPage;