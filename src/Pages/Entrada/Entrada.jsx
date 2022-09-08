import React, { useState, useEffect } from 'react';
import EntradaMaterial from '../../components/EntradaMaterial';
import { getTabela } from '../../common/utils';

const Entrada = () => {
    const [entradas, setEntradas] = useState([]);
    const [metaEntradas, setMetaEntradas] = useState({});
    const [page, setPage] = useState(1);
    const [carregando, setCarregando] = useState(true);
    const [filtros, setFiltros] = useState('')

    useEffect(() => {
        getTabela('entradas', page, setCarregando, setEntradas, setMetaEntradas, filtros);
        console.log(filtros, metaEntradas)
    }, [page, filtros])

    return (
        <EntradaMaterial 
            entradas={entradas} 
            metaEntradas={metaEntradas} 
            page={page}
            setPage={setPage}
            carregando={carregando}
            setFiltros={setFiltros}
        />
    );
}

export default Entrada;