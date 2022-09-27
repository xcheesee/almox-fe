import React, { useState } from 'react';
import BoxLogin from '../components/BoxLogin';
import { useNavigate } from 'react-router';

const Login = () => {
    const [visibilidade, setVisibilidade] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        setCarregando(true);
        setErrors({});

        const formData = new FormData(e.target);
        const inputObject = Object.fromEntries(formData);
        const url = `${process.env.REACT_APP_API_URL}/login`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(inputObject)
        };

        fetch(url, options)
            .then(res => {
                if (res.ok) {
                    setCarregando(false);
                    return res.json()
                        .then(data => {
                            localStorage.setItem('usermail', inputObject.email)
                            localStorage.setItem('access_token', `${data.token_type} ${data.access_token}`);
                            localStorage.setItem('username', data.username);
                            localStorage.setItem('departamentos', JSON.stringify(data.departamentos));
                            localStorage.setItem('user_id', data.id);
                            navigate('/principal', { replace: true });
                        });
                } else if (res.status === 401) {
                    setCarregando(false);
                    return res.json()
                        .then(data => setErrors(data));
                } else {
                    setCarregando(false);
                    return res.json()
                        .then(data => {
                            console.log(data);
                            // configurar o dialog no futuro
                        });
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <BoxLogin 
            visibilidade={visibilidade} 
            setVisibilidade={setVisibilidade}
            carregando={carregando}
            setCarregando={setCarregando}
            login={login}
            errors={errors}
        />
    );
}

export default Login;