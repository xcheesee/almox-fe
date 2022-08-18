import React, { useState } from 'react';
import Margens from '../components/Margens';
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
                        .then(data => console.log(data));
                } else if (res.status === 401) {
                    setCarregando(false);
                    return res.json()
                        .then(data => console.log(data));
                } else {
                    setCarregando(false);
                    return res.json()
                        .then(data => {
                            navigate('/principal', { replace: true });
                            console.log(data);
                        });
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <Margens>
            <BoxLogin 
                visibilidade={visibilidade} 
                setVisibilidade={setVisibilidade}
                carregando={carregando}
                setCarregando={setCarregando}
                login={login}
                errors={errors}
            />
        </Margens>
    );
}

export default Login;