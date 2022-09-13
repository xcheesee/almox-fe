import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { getTabela } from '../../common/utils';
import EntradaMaterial from '../../components/EntradaMaterial';
import DialogEditar from '../../components/DialogEditar';
import FormEntradaMaterial from '../../components/FormEntradaMaterial';
import DialogConfirmaEdicao from '../../components/DialogConfirmaEdicao';
import DialogExcluir from '../../components/DialogExcluir';

const Entrada = () => {
    const [entradas, setEntradas] = useState([]);
    const [materiais, setMateriais] = useState([]);
    const [metaEntradas, setMetaEntradas] = useState({});
    const [page, setPage] = useState(1);
    const [carregando, setCarregando] = useState(true);
    const [carregandoEdicao, setCarregandoEdicao] = useState(false);
    const [openEditar, setOpenEditar] = useState(false);
    const [openConfirmar, setOpenConfirmar] = useState(false);
    const [openExcluir, setOpenExcluir] = useState(false);
    const [entradaMaterial, setEntradaMaterial] = useState({});
    const [cursor, setCursor] = useState('default');
    const [filtros, setFiltros] = useState('')

    useEffect(() => {
        getTabela('entradas', page, setCarregando, setEntradas, setMetaEntradas, filtros);
        setMateriais([]);
    }, [page, openEditar, filtros])

    return (
        <Box sx={{ cursor: cursor }}>
            <EntradaMaterial 
                entradas={entradas} 
                metaEntradas={metaEntradas} 
                page={page}
                setPage={setPage}
                carregando={carregando}
                setOpenEditar={setOpenEditar}
                setEntradaMaterial={setEntradaMaterial}
                setMateriais={setMateriais}
                setCursor={setCursor}
                cursor={cursor}
                filtros={filtros}
                setFiltros={setFiltros}
            />
            <DialogEditar
                titulo="Editar entrada de material"
                openEditar={openEditar}
                setOpenEditar={setOpenEditar}
                defaultValue={entradaMaterial}
                carregando={carregandoEdicao}
                setOpenConfirmar={setOpenConfirmar}
                setOpenExcluir={setOpenExcluir}
            >
                <FormEntradaMaterial 
                    defaultValue={entradaMaterial} 
                    setCarregando={setCarregandoEdicao}
                    setOpenEditar={setOpenEditar}
                    setOpenConfirmar={setOpenConfirmar}
                    acao="editar"
                    materiais={materiais}
                    setMateriais={setMateriais}
                />
            </DialogEditar>
            <DialogConfirmaEdicao 
                texto="entrada de material"
                id={entradaMaterial.id}
                openConfirmar={openConfirmar}
                setOpenConfirmar={setOpenConfirmar}
                form="nova-entrada"
            />
            <DialogExcluir 
                rota="entrada"
                texto="entrada de material"
                id={entradaMaterial.id}
                openExcluir={openExcluir}
                setOpenExcluir={setOpenExcluir}
                setOpenEditar={setOpenEditar}
                setCarregando={setCarregandoEdicao}
            />
        </Box>
    );
}

export default Entrada;