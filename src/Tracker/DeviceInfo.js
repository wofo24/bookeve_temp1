// DeviceInfo.js
import React, { useEffect, useState } from 'react';

function DeviceInfo() {
    const [userAgent, setUserAgent] = useState('');
    const [browserName, setBrowserName] = useState('');

    useEffect(() => {
        const userAgentString = navigator.userAgent;
        setUserAgent(userAgentString);
        const browserInfo = getBrowserInfo(userAgentString);
        setBrowserName(browserInfo.name);
    }, []);

    const getBrowserInfo = (userAgentString) => {
        const data = {};
        const agentString = userAgentString.toLowerCase();

        if (agentString.includes('chrome')) {
            data.name = 'Google Chrome';
        } else if (agentString.includes('firefox')) {
            data.name = 'Mozilla Firefox';
        } else if (agentString.includes('safari') && !agentString.includes('chrome')) {
            data.name = 'Safari';
        } else if (agentString.includes('msie') || agentString.includes('trident')) {
            data.name = 'Internet Explorer';
        } else {
            data.name = 'Unknown';
        }

        return data;
    };

    return (
        <div>
            <h2>User's Device and Browser Information</h2>
            <p>User Agent: {userAgent}</p>
            <p>Browser: {browserName}</p>
        </div>
    );
}

export default DeviceInfo;
