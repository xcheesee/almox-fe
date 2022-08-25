import React, { useState, useEffect } from 'react';
import { headers } from '../../common/utils';
import OrdemServico from '../../components/OrdemServico';

const Ordem = () => {
    const [ordens, setOrdens] = useState([]);
    const [metaOrdens, setMetaOrdens] = useState({});
    const [page, setPage] = useState(1);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const url = `${process.env.REACT_APP_API_URL}/ordem_servico?page=${page}`;
        const options = {
            method: 'GET',
            headers: headers
        };

        setCarregando(true);

        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                setCarregando(false);
                setOrdens(data.data);
                setMetaOrdens(data.meta);
            });
    }, [page])

    return (
        <OrdemServico 
            ordens={ordens}
            metaOrdens={metaOrdens}
            page={page}
            setPage={setPage}
            carregando={carregando}
        />
    );
}

export default Ordem;