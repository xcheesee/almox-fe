import React, { useState } from 'react';
import BoxLogin from '../components/BoxLogin';
import { AuthRequest, loginRequest } from '../common/utils';
import { useMutation } from '@tanstack/react-query';
import { useAuth, useAuthenticatedQuery } from '../common/utils/hooks';
import { Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

const Login = () => {
    const [visibilidade, setVisibilidade] = useState(false);
    const [errors, setErrors] = useState({});
    const { log_in, token } = useAuth();

    const loginMutation = useMutation((data) => loginRequest(data) , {
        onSuccess: (data) => {
            log_in(data)
        }, onError: (data) => {
            setErrors(data)
        }
    })

    const login = async (e) => {
        e.preventDefault();
        setErrors({});

        const formData = new FormData(e.target);
        const inputObject = Object.fromEntries(formData);
        loginMutation.mutate(inputObject)
    }

    const authQuery = useAuthenticatedQuery({
        queryFn: () => AuthRequest(),
        queryKey: ['auth']
    })

    if(!!token && !authQuery.isLoading && !authQuery.isError ) return <Navigate to="/principal"/>

    if(authQuery.isLoading) return <Box className='grid w-full h-screen justify-center items-center'><CircularProgress size={60}/></Box>

    return (
        <BoxLogin 
            visibilidade={visibilidade} 
            setVisibilidade={setVisibilidade}
            carregando={loginMutation.isLoading}
            login={login}
            errors={errors}
        />
    );
}

export default Login;
