import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { getTabela } from '../../common/utils';
import OrdemServico from '../../components/OrdemServico';
import DialogEditar from '../../components/DialogEditar';
import FormOrdemServico from '../../components/FormOrdemServico';
import DialogConfirmaEdicao from '../../components/DialogConfirmaEdicao';

const Ordem = () => {
    const [ordens, setOrdens] = useState([]);
    const [metaOrdens, setMetaOrdens] = useState({});
    const [page, setPage] = useState(1);
    const [carregando, setCarregando] = useState(true);
    const [carregandoEdicao, setCarregandoEdicao] = useState(false);
    const [openEditar, setOpenEditar] = useState(false);
    const [openConfirmar, setOpenConfirmar] = useState(false);
    const [ordemServico, setOrdemServico] = useState({});
    const [cursor, setCursor] = useState('default');
    const [filtros, setFiltros] = useState('')

    useEffect(() => {
        getTabela('ordem_servicos', page, setCarregando, setOrdens, setMetaOrdens, filtros);
    }, [page, openEditar, filtros]) // usar o openEditar para atualizar a tabela depois da edição não parece a melhor implementação -> pensar em algo melhor depois

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
                filtros={filtros}
                setFiltros={setFiltros}
            />
            <DialogEditar
                titulo="Editar ordem de serviço"
                openEditar={openEditar}
                setOpenEditar={setOpenEditar}
                defaultValue={ordemServico}
                carregando={carregandoEdicao}
                setOpenConfirmar={setOpenConfirmar}
            >
                <FormOrdemServico 
                    defaultValue={ordemServico} 
                    setCarregando={setCarregandoEdicao}
                    setOpenEditar={setOpenEditar}
                    setOpenConfirmar={setOpenConfirmar}
                />
            </DialogEditar>
            <DialogConfirmaEdicao
                texto="ordem de serviço"
                id={ordemServico.id}
                openConfirmar={openConfirmar}
                setOpenConfirmar={setOpenConfirmar}
                form="nova-ordem"
            />
        </Box>
    );
}

export default Ordem;