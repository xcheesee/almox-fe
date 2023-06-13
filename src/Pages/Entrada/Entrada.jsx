import React, { useState } from 'react';
import { Box } from '@mui/material';
import { getMateriais, getRegistro, getTabela } from '../../common/utils';
import EntradaMaterial from '../../components/EntradaMaterial';
import DialogEditar from '../../components/DialogEditar';
import DialogDetalhesEntrada from '../../components/DialogDetalhesEntrada';
import FormEntradaMaterial from '../../components/EntradaMaterial/FormEntradaMaterial';
import DialogConfirmaEdicao from '../../components/DialogConfirmaEdicao';
import DialogExcluir from '../../components/DialogExcluir';
import { excluirAtom, matsAtom } from '../../atomStore';
import { useAtom, useSetAtom } from 'jotai';

const Entrada = () => {
    const [openEditar, setOpenEditar] = useState(false);
    const [openConfirmar, setOpenConfirmar] = useState(false);
    const [carregandoEdicao, setCarregandoEdicao] = useState(false);
    
    const [entradaMaterial, setEntradaMaterial] = useState({});
    const [cursor, setCursor] = useState('auto');
    const [errors, setErrors] = useState({});
    const [openDetalhes, setOpenDetalhes] = useState(false);
    
    const setOpenExcluir = useSetAtom(excluirAtom);
    const [materiais, setMateriais] = useAtom(matsAtom);

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
