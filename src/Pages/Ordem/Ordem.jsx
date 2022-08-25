import React, { useState, useEffect } from 'react';
import { getTabela } from '../../common/utils';
import OrdemServico from '../../components/OrdemServico';

const Ordem = () => {
    const [ordens, setOrdens] = useState([]);
    const [metaOrdens, setMetaOrdens] = useState({});
    const [page, setPage] = useState(1);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        getTabela('ordem_servico', page, setCarregando, setOrdens, setMetaOrdens);
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