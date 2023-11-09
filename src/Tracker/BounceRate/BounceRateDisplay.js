import React, { useEffect, useState } from 'react';

function BounceRateDisplay({ bounceRate }) {
  return (
    <div>
      <p>Bounce Rate: {bounceRate}%</p>
    </div>
  );
}

export default BounceRateDisplay;
