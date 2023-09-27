import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function PageViews() {
    const [pageViews, setPageViews] = useState({});
    const location = useLocation();
    const [sessionStartTime, setSessionStartTime] = useState(Date.now());
    const [sessionDuration, setSessionDuration] = useState(0);

    const data = [
        {
            userType: null,
            "user_id": null,
            "page_visited": location.pathname,
            "page_url":`http://localhost:3000/${location.pathname}`,
            "duration_seconds": sessionDuration,
            "timestamp": "2023-09-26T10:00:00"
        }
    ]

    useEffect(() => {
        const apiCall = () => {
            localStorage.setItem('sessionD', sessionDuration)
            localStorage.setItem('sessionST', sessionStartTime)
            localStorage.setItem('path', location.pathname)
        }
        apiCall()
        setSessionStartTime(Date.now()); 
    }, [location.pathname]);

    useEffect(() => {
        setPageViews((prevPageViews) => ({
            ...prevPageViews,
            [location.pathname]: (prevPageViews[location.pathname] || 0) + 1,
        }));
    }, [location.pathname]);

    useEffect(() => {
        const interval = setInterval(() => {
            setSessionDuration(Math.floor((Date.now() - sessionStartTime) / 1000));
        }, 1000);
        return () => {
            clearInterval(interval);
            const finalSessionDuration = Math.floor((Date.now() - sessionStartTime) / 1000);
            localStorage.setItem('sessionD', finalSessionDuration)
            // console.log(finalSessionDuration, 'start Time', location.pathname)
        };
    }, [sessionStartTime]);


    // console.log(data, 'time Duration data')

    return (
        <div>
            <p>Page Views:</p>
            <ul>
                {Object.entries(pageViews).map(([page, views]) => (
                    <li key={page}>
                        {page}: {views}
                    </li>
                ))}
            </ul>
        </div>
    );
}
