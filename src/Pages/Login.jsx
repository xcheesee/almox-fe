import React, { useState } from 'react';
import BoxLogin from '../components/BoxLogin';
import { useNavigate } from 'react-router';
import { loginRequest } from '../common/utils';
import { useMutation } from '@tanstack/react-query';

const Login = () => {
    const [visibilidade, setVisibilidade] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const loginMutation = useMutation((data) => loginRequest(data) , {
        onSuccess: (data) => {
            localStorage.setItem('usermail', data.email)
            localStorage.setItem('access_token', `${data.token_type} ${data.access_token}`);
            localStorage.setItem('username', data.username);
            localStorage.setItem('departamentos', JSON.stringify(data.departamentos));
            localStorage.setItem('user_id', data.id);
            localStorage.setItem('perfil', data.perfil);
            if (data.perfil === 'encarregado')
                navigate('/ordemservico', { replace: true });
            else
                navigate('/principal', { replace: true });
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