import React, { useEffect, useState } from 'react';
import BounceRateDisplay from './BounceRate/BounceRateDisplay';

function BounceRateTracker() {
  const [bounceRate, setBounceRate] = useState(0);
  const [pageVisited, setPageVisited] = useState(false);

  useEffect(() => {
    // Detect when the user leaves the site
    const handlePageExit = (event) => {
      if (!pageVisited) {
        setBounceRate((prevBounceRate) => prevBounceRate + 1);
      }
    };

    // Add event listener for beforeunload (when the user is leaving the page)
    window.addEventListener('beforeunload', handlePageExit);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handlePageExit);
    };
  }, [pageVisited]);

  return (
    <>
    <BounceRateDisplay bounceRate={bounceRate}/>
    </>
  ) // This component doesn't render anything in the UI.
}

export default BounceRateTracker;
