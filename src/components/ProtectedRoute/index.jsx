import { Navigate, useLocation } from "react-router-dom";
import { useAuth, useAuthenticatedQuery } from "../../common/utils/hooks";
import { AuthRequest, authCreateEntrada, authCreateOrdem } from "../../common/utils";

export default function ProtectedRoute({children}) {
    //const queryClient = useQueryClient()
    const location = useLocation()
    const { 
        token,
        perfil,
     } = useAuth()

    const authQuery = useAuthenticatedQuery({
        queryFn: () => AuthRequest(),
        queryKey: ['auth'],
    })
    //refetch a query toda vez que houver uma mudanca de pagina
    //useEffect(() => {
    //    queryClient.invalidateQueries({
    //        queryKey: ['auth']
    //    })
    //}, [location.pathname])

    if(!token && !authQuery.isLoading) return <Navigate to="/" />;
    else if(location.pathname === '/entrada/nova-entrada' && authCreateEntrada(perfil) === 'none') return <Navigate to="/entrada" />;
    else if(location.pathname === '/ordemservico/nova-ordem' && authCreateOrdem(perfil) === 'none') return <Navigate to="/ordemservico" />;
    return children;
}