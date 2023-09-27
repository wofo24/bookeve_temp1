import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function UniqueVisitor() {
  const [visitStartTime, setVisitStartTime] = useState(null);
  const [visitEndTime, setVisitEndTime] = useState(null);

  const data = [
    {
      "user_id": "user123",
      "first_visit_timestamp": visitStartTime,
      "last_visit_timestamp": visitEndTime,
    },
  ];

  useEffect(() => {
    const startTime = new Date();
    setVisitStartTime(startTime.toISOString());
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const endTime = new Date();
      setVisitEndTime(endTime.toISOString());
      localStorage.setItem('uniqueuser', JSON.stringify(data));
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (!Cookies.get('uniqueVisitor')) {
      Cookies.set('uniqueVisitor', 'true', { expires: 365 });
      const visitorInfo = {
        ipAddress: 'sample-ip-address',
        userAgent: navigator.userAgent,
      };
    }
  }, []);

  return (
    <div>
      <p>First Visit Time: {visitStartTime}</p>
      <p>Last Visit Time: {visitEndTime}</p>
    </div>
  );
}
