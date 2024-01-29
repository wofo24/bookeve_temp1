import Cookies from 'js-cookie';
import {  useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { protectRoute } from '../../Redux/actions/actions';
import {  useDispatch } from 'react-redux';
import { store_pathname } from '../../Redux/actions/actions';

const decodeJWT = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const decodedData = JSON.parse(atob(base64));
        return decodedData;
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
    }
};

const calculateTimeRemaining = (expirationTime) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const timeRemaining = expirationTime - currentTime;
    return timeRemaining > 0 ? timeRemaining : 0;
};

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
};

const isTokenExpired = (expirationTime) => {
    const currentTime = Math.floor(Date.now() / 1000);
    return expirationTime <= currentTime;
};

export default function Protected(props) {
    const Component = props?.component;
    const isLoggedIn = Cookies.get('token');
    const token = Cookies.get('token');
    const location = useLocation();

    useEffect(() => {
        if (token) {
            const decodedToken = decodeJWT(token);
            console.log('Decoded Token:', decodedToken);

            const expirationTime = decodedToken.exp;
            if (expirationTime) {
                const remainingTime = calculateTimeRemaining(expirationTime);
                console.log('Remaining Time:', formatTime(remainingTime));

                if (isTokenExpired(expirationTime)) {
                    console.warn('Token has expired. Redirecting to login.');
                    window.location.href = '/login';
                }
            } else {
                console.warn('Token does not contain expiration time.');
            }
        } else {
            console.warn('Token not found in cookies.');
        }
    }, [token]);
    useEffect(() => {
        if (!props?.protected) {
            dispatch(store_pathname(location.pathname))
        }
    }, [location.pathname, props?.protected, Component]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn && props?.component?.name) {
            dispatch(protectRoute(props.component.name));
        }
    }, [isLoggedIn, props?.component?.name]);

    return isLoggedIn ? <Component /> : <Navigate to="/login" replace />;


}
