import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { getTabela } from '../../common/utils';
import OrdemServico from '../../components/OrdemServico';
import DialogEditar from '../../components/DialogEditar';
import FormOrdemServico from '../../components/FormOrdemServico';

const Ordem = () => {
    const [ordens, setOrdens] = useState([]);
    const [metaOrdens, setMetaOrdens] = useState({});
    const [page, setPage] = useState(1);
    const [carregando, setCarregando] = useState(true);
    const [openEditar, setOpenEditar] = useState(false);
    const [ordemServico, setOrdemServico] = useState({});
    const [cursor, setCursor] = useState('default');

    useEffect(() => {
        getTabela('ordem_servico', page, setCarregando, setOrdens, setMetaOrdens);
    }, [page])

    return (
        <Box sx={{ cursor: cursor }}>
            <OrdemServico 
                ordens={ordens}
                metaOrdens={metaOrdens}
                page={page}
                setPage={setPage}
                carregando={carregando}
                setOpenEditar={setOpenEditar}
                setOrdemServico={setOrdemServico}
                setCursor={setCursor}
                cursor={cursor}
            />
            <DialogEditar
                titulo="Editar ordem de serviço"
                openEditar={openEditar}
                setOpenEditar={setOpenEditar}
                defaultValue={ordemServico}
            >
                <FormOrdemServico defaultValue={ordemServico} />
            </DialogEditar>
        </Box>
    );
}

export default Ordem;