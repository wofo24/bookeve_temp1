import React from 'react';

function SessionDurationDisplay({ sessionDuration }) {
  const minutes = Math.floor(sessionDuration / 60);
  const seconds = sessionDuration % 60;
 
  return (
    <div>
      <p>Session Duration: {minutes} minutes and {seconds} seconds</p>
    </div>
  );
}

export default SessionDurationDisplay;
