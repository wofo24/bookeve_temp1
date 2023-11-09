import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Location() {
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    axios
                        .get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
                        .then((response) => {
                            const address = response?.data?.address;

                            if (address) {
                                let city, state;

                                // Check for city names with different tags
                                if (address.city) {
                                    city = address.city;
                                } else if (address.town) {
                                    city = address.town;
                                } else if (address.village) {
                                    city = address.village;
                                }

                                // Check for state or other regional information
                                state = address.state;

                                setUserLocation({ city, state });
                            }
                        })
                        .catch((error) => {
                            console.error('Error fetching location data:', error);
                        });

                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported in this browser.');
        }
    }, []);

    return (
        <>
            <h1>Your location</h1>
            {userLocation ? (
                <>
                    <h5>City: {userLocation.city}</h5>
                    <h5>State: {userLocation.state}</h5>
                </>
            ) : (
                <p>Loading location data...</p>
            )}
        </>
    );
}
