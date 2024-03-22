import React, { useState } from 'react';
import BoxLogin from '../components/BoxLogin';
import { useNavigate } from 'react-router';
import { loginRequest } from '../common/utils';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../common/utils/hooks';

const Login = () => {
    const [visibilidade, setVisibilidade] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { log_in } = useAuth();

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
