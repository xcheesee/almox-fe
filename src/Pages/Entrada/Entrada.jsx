import React, { useState } from 'react';
import { Box } from '@mui/material';
import { getMateriais, getRegistro, getTabela } from '../../common/utils';
import EntradaMaterial from '../../components/EntradaMaterial';
import DialogEditar from '../../components/DialogEditar';
import DialogDetalhesEntrada from '../../components/DialogDetalhesEntrada';
import FormEntradaMaterial from '../../components/FormEntradaMaterial';
import DialogConfirmaEdicao from '../../components/DialogConfirmaEdicao';
import DialogExcluir from '../../components/DialogExcluir';
import { excluirAtom, filtrosAtom, matsAtom, pageAtom, sortAtom } from '../../atomStore';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query'

const Entrada = () => {
    const [openEditar, setOpenEditar] = useState(false);
    const [openConfirmar, setOpenConfirmar] = useState(false);
    const [carregandoEdicao, setCarregandoEdicao] = useState(false);
    
    const [entradaMaterial, setEntradaMaterial] = useState({});
    const [cursor, setCursor] = useState('auto');
    const [errors, setErrors] = useState({});
    const [openDetalhes, setOpenDetalhes] = useState(false);
    
    const setOpenExcluir = useSetAtom(excluirAtom);
    const sort = useAtomValue(sortAtom);
    const page = useAtomValue(pageAtom);
    const filtros = useAtomValue(filtrosAtom);
    const [materiais, setMateriais] = useAtom(matsAtom);

    const entradas = useQuery(['entradaItens', page, filtros, sort], () => getTabela('entradas', page, filtros, sort));

    const getSelectedEntradaInfo = async (id, command) => {
        setCursor('progress')
        const [registroData, matsData] = await Promise.all([getRegistro('entrada', id,), getMateriais('entrada', id,)])
        switch(command) {
            case 'visualizar':
                setEntradaMaterial(registroData)
                setMateriais(matsData)
                setOpenDetalhes(true)
                break;
            case 'editar':
                setEntradaMaterial(registroData)
                setMateriais(matsData)
                setOpenEditar(true)
                break;
            default:
                break;
        }
        setCursor('auto')  
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
                carregando={carregandoEdicao}
                defaultValue={entradaMaterial}
                setOpenConfirmar={setOpenConfirmar}
                setOpenExcluir={setOpenExcluir}
            >
                <FormEntradaMaterial 
                    defaultValue={entradaMaterial}
                    setOpenEditar={setOpenEditar}
                    setOpenConfirmar={setOpenConfirmar}
                    setCarregando={setCarregandoEdicao}
                    acao="editar"
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
