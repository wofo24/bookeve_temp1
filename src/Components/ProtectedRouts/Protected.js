import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { protectRoute } from '../../Redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';

export default function Protected(props) {
    const Component = props?.component;
    // const [componentName, setComponentName] = useState();
    // const isLoggedIn = Cookies.get('token');
    const isLoggedIn = true;
    const dispatch = useDispatch()

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(protectRoute(props?.component?.name))
        }
    }, [isLoggedIn, props?.component?.name]);
    return isLoggedIn ? <Component /> : <Navigate to='/login' replace />;
}
