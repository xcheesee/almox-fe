import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../common/utils/hooks";
import { authCreateEntrada, authCreateOrdem } from "../../common/utils";

export default function ProtectedRoute({children}) {
    const location = useLocation()
    const { 
        token,
        perfil,
     } = useAuth()
    if(!token) return <Navigate to="/" />;
    if(location.pathname === '/entrada/nova-entrada' && authCreateEntrada(perfil) === 'none') return <Navigate to="/entrada" />
    if(location.pathname === '/ordemservico/nova-ordem' && authCreateOrdem(perfil) === 'none') return <Navigate to="/ordemservico" />
    return children;
}