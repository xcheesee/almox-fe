import { createContext, useContext, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { authCreateEntrada, authCreateOrdem } from "."
import { useQuery } from "@tanstack/react-query"

const AuthContext = createContext()

export const useLocalStorage = (key, defaultVal) => {
    const [storedVal, setStoredVal] = useState(localStorage.getItem(key) ?? defaultVal)
    const setVal = (newVal) => {
        localStorage.setItem(key, newVal)
        setStoredVal(newVal)
    }

    return [storedVal, setVal]
}

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useLocalStorage('access_token', "")
    const [perfil, setPerfil] = useLocalStorage('perfil', "")
    const [username, setUsername] = useLocalStorage('username', "Convidado")
    const [usermail, setUsermail] = useLocalStorage('usermail', "")
    const [departamentos, setDepartamentos] = useLocalStorage('departamentos', "")
    const [userId, setUserId] = useLocalStorage('user_id', "")
    const [local, setLocal] = useLocalStorage('local', "")
    const navigate = useNavigate()
    const location = useLocation()

    const log_in = async (data) => {
        setToken(`${data.token_type} ${data.access_token}`);
        setPerfil(data.perfil)
        setUsermail(data.email)
        setUsername(data.username)
        setDepartamentos(JSON.stringify(data.departamentos))
        setUserId(data.id)
        setLocal(data?.local_id ?? "")
        if (data.perfil === 'encarregado')
            navigate('/ordemservico', { replace: true });
        else if (location.pathname === '/entrada/nova-entrada' && authCreateEntrada(data.perfil) === 'none')
            navigate("/entrada", { replace: true })
        else if (location.pathname === '/ordemservico/nova-ordem' && authCreateOrdem(data.perfil) === 'none')
            navigate("/ordemservico", { replace: true })
        else 
            navigate('/principal', { replace: true });
    }

    const log_out = () => {
        setToken("")
        setPerfil("")
        setUsermail("")
        setUsername("Convidado")
        setDepartamentos("")
        setUserId("")
        setLocal("")
        navigate("/", {replace: true})
    }

    const value = useMemo(() => ({
        token,
        perfil,
        usermail,
        username,
        departamentos,
        userId,
        local,
        log_in,
        log_out,
    }), [token]);
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export const useAuthenticatedQuery = ({
    queryKey,
    queryFn,
    cacheTime=5*60*1000,
    staleTime=0,
    enabled=true,
    networkMode='online',
    onSuccess=()=>{},
    onError=()=>{},
    onSettled=()=>{}
}) => {
    const { log_out } = useAuth()

    const query = useQuery({
        queryFn: async () => await queryFn(),
        queryKey: queryKey,
        cacheTime: cacheTime,
        staleTime: staleTime,
        enabled: enabled,
        networkMode: networkMode,
        onSuccess: onSuccess,
        onError: (res) => {
            onError(res)
            if(res.status === 401) {
                log_out()
            }
        },
        onSettled: onSettled,
        retry: (failureCount, error) => {
            if(error.status !== 401 && failureCount <4) return true
            return false
        },
    })

    return query
}