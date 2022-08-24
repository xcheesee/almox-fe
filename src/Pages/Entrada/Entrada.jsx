import React, { useState, useEffect } from 'react';
import EntradaMaterial from '../../components/EntradaMaterial';

const Entrada = () => {
    const [entradas, setEntradas] = useState([]);
    const [metaEntradas, setMetaEntradas] = useState({});
    const [page, setPage] = useState(1);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const url = `${process.env.REACT_APP_API_URL}/entradas?page=${page}`;
        const token = localStorage.getItem('access_token');
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token
            }
        };

        setCarregando(true);

        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                setCarregando(false)
                setEntradas(data.data);
                setMetaEntradas(data.meta);
            });
    }, [page])

    return (
        <EntradaMaterial 
            entradas={entradas} 
            metaEntradas={metaEntradas} 
            page={page}
            setPage={setPage}
            carregando={carregando}
        />
    );
}

export default Entrada;