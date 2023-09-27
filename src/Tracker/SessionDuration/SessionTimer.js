import React, { useEffect, useState } from 'react';
import SessionDurationDisplay from './SessionDuration';

function SessionTimer() {
    const [sessionStartTime, setSessionStartTime] = useState(Date.now());
    const [sessionDuration, setSessionDuration] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSessionDuration(Math.floor((Date.now() - sessionStartTime) / 1000));
        }, 1000);
        return () => {
            clearInterval(interval);
            const finalSessionDuration = Math.floor((Date.now() - sessionStartTime) / 1000);
        };
    }, [sessionStartTime]);

    return (
        <>
            <SessionDurationDisplay sessionDuration={sessionDuration} />
        </>
    );
}

export default SessionTimer;
