import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { getTabela } from '../../common/utils';
import OrdemServico from '../../components/OrdemServico';
import DialogEditar from '../../components/DialogEditar';
import DialogExcluir from '../../components/DialogExcluir';
import FormOrdemServico from '../../components/FormOrdemServico';
import DialogConfirmaEdicao from '../../components/DialogConfirmaEdicao';
import DialogDetalhesOrdem from '../../components/DialogDetalhesOrdem';

const Ordem = ({ setSnackbar, locais, carregandoLocais }) => {
    const [ordens, setOrdens] = useState([]);
    const [metaOrdens, setMetaOrdens] = useState({});
    const [page, setPage] = useState(1);
    const [carregando, setCarregando] = useState(true);
    const [carregandoEdicao, setCarregandoEdicao] = useState(false);
    const [openEditar, setOpenEditar] = useState(false);
    const [openConfirmar, setOpenConfirmar] = useState(false);
    const [openExcluir, setOpenExcluir] = useState(false);
    const [ordemServico, setOrdemServico] = useState({});
    const [cursor, setCursor] = useState('auto');
    const [filtros, setFiltros] = useState('');
    const [houveMudanca, setHouveMudanca] = useState(false);
    const [errors, setErrors] = useState({});
    const [openDetalhes, setOpenDetalhes] = useState(false);

    useEffect(() => {
        getTabela('ordem_servicos', page, setCarregando, setOrdens, setMetaOrdens, filtros);
        setErrors({});
    }, [page, houveMudanca, filtros])

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
                setOpenDetalhes={setOpenDetalhes}
            />
            <DialogEditar
                titulo="Editar ordem de serviço"
                openEditar={openEditar}
                setOpenEditar={setOpenEditar}
                defaultValue={ordemServico}
                carregando={carregandoEdicao}
                setOpenConfirmar={setOpenConfirmar}
                setOpenExcluir={setOpenExcluir}
            >
                <FormOrdemServico 
                    defaultValue={ordemServico} 
                    setCarregando={setCarregandoEdicao}
                    setOpenEditar={setOpenEditar}
                    setOpenConfirmar={setOpenConfirmar}
                    acao="editar"
                    setSnackbar={setSnackbar}
                    setHouveMudanca={setHouveMudanca}
                    errors={errors}
                    setErrors={setErrors}
                    locais={locais}
                    carregandoLocais={carregandoLocais}
                />
            </DialogEditar>
            <DialogConfirmaEdicao
                texto="ordem de serviço"
                id={ordemServico.id}
                openConfirmar={openConfirmar}
                setOpenConfirmar={setOpenConfirmar}
                form="nova-ordem"
            />
            <DialogExcluir 
                rota="ordem_servico"
                texto="ordem de serviço"
                id={ordemServico.id}
                openExcluir={openExcluir}
                setOpenExcluir={setOpenExcluir}
                setOpenEditar={setOpenEditar}
                setCarregando={setCarregandoEdicao}
                setSnackbar={setSnackbar}
            />
            <DialogDetalhesOrdem 
                openDetalhes={openDetalhes}
                setOpenDetalhes={setOpenDetalhes}
                ordem={ordemServico}
            />
        </Box>
    );
}

export default Ordem;