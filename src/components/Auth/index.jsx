import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { authCreateEntrada, authCreateOrdem } from '../../common/utils';
import Margens from '../Margens';

const Auth = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const access_token = localStorage.getItem('access_token');
    const perfil = localStorage.getItem('perfil');

    useEffect(() => {
        if (!access_token && location.pathname !== "/")
            navigate("/", { replace: true })
        else if (access_token && location.pathname === "/")
            navigate("/principal", { replace: true })
        else if (access_token && perfil === 'encarregado')
            navigate("/ordemservico", { replace: true })
        else if (access_token && location.pathname === '/entrada/nova-entrada' && authCreateEntrada(perfil) === 'none')
            navigate("/entrada", { replace: true })
        else if (access_token && location.pathname === '/ordemservico/nova-ordem' && authCreateOrdem(perfil) === 'none')
            navigate("/ordemservico", { replace: true })
    })
    
    return (
        <Margens itemsAcabando={props.itemsAcabando}>
            {props.children}
        </Margens>
    );
}

export default Auth;