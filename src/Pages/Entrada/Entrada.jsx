import React, { useState } from 'react';
import { Box } from '@mui/material';
import { getRegistro, getTabela } from '../../common/utils';
import EntradaMaterial from '../../components/EntradaMaterial';
import DialogEditar from '../../components/DialogEditar';
import DialogDetalhesEntrada from '../../components/DialogDetalhesEntrada';
import FormEntradaMaterial from '../../components/FormEntradaMaterial';
import DialogConfirmaEdicao from '../../components/DialogConfirmaEdicao';
import DialogExcluir from '../../components/DialogExcluir';
import { excluirAtom, filtrosAtom, matsAtom, mudancaAtom, pageAtom, sortAtom } from '../../atomStore';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query'

const Entrada = () => {
    const [openEditar, setOpenEditar] = useState(false);
    const [openConfirmar, setOpenConfirmar] = useState(false);
    
    const [entradaMaterial, setEntradaMaterial] = useState({});
    const [cursor, setCursor] = useState('auto');
    const [errors, setErrors] = useState({});
    const [openDetalhes, setOpenDetalhes] = useState(false);
    
    const setOpenExcluir = useSetAtom(excluirAtom);
    const setHouveMudanca = useSetAtom(mudancaAtom);
    const sort = useAtomValue(sortAtom);
    const page = useAtomValue(pageAtom);
    const filtros = useAtomValue(filtrosAtom);
    const [materiais, setMateriais] = useAtom(matsAtom);

    const entradas = useQuery(['entradaItens', page, filtros, sort], () => getTabela('entradas', page, filtros, sort));

    const getSelectedEntradaInfo = (id, command) => {
        switch(command) {
            case 'visualizar':
                getRegistro('entrada', id, setOpenDetalhes, setEntradaMaterial, setCursor, setMateriais);
                break;
            case 'editar':
                getRegistro('entrada', id, setOpenEditar, setEntradaMaterial, setCursor, setMateriais);
                break;
            default:
                console.log('pog')
                break;
        }  
    }

    return (
        <Box sx={{ cursor: cursor }}>
            <EntradaMaterial 
                entradas={entradas?.data} 
                carregando={entradas?.isLoading}
                getSelectedEntradaInfo={getSelectedEntradaInfo}
                cursor={cursor}
            />

            <DialogEditar
                titulo="Editar entrada de material"
                openEditar={openEditar}
                setOpenEditar={setOpenEditar}
                defaultValue={entradaMaterial}
                setOpenConfirmar={setOpenConfirmar}
                setOpenExcluir={setOpenExcluir}
            >
                <FormEntradaMaterial 
                    defaultValue={entradaMaterial}
                    setOpenEditar={setOpenEditar}
                    setOpenConfirmar={setOpenConfirmar}
                    acao="editar"
                    setHouveMudanca={setHouveMudanca}
                    errors={errors}
                    setErrors={setErrors}
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
                setOpenEditar={setOpenEditar}
                setHouveMudanca={setHouveMudanca}
            />
            <DialogDetalhesEntrada
                openDetalhes={openDetalhes} 
                setOpenDetalhes={setOpenDetalhes}
                entrada={entradaMaterial}
                materiais={materiais}
            />
        </Box>
    );
}

export default Entrada;