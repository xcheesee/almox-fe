import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Margens from './Margens';

const Auth = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const access_token = localStorage.getItem('access_token');

    useEffect(() => {
        if (!access_token && location.pathname !== "/")
            navigate("/", { replace: true })
    })
    
    return (
        <Margens>
            {props.children}
        </Margens>
    );
}

export default Auth;