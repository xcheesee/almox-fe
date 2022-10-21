import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { getTabela } from '../../common/utils';
import EntradaMaterial from '../../components/EntradaMaterial';
import DialogEditar from '../../components/DialogEditar';
import DialogDetalhesEntrada from '../../components/DialogDetalhesEntrada';
import FormEntradaMaterial from '../../components/FormEntradaMaterial';
import DialogConfirmaEdicao from '../../components/DialogConfirmaEdicao';
import DialogExcluir from '../../components/DialogExcluir';
import { excluirAtom, filtrosAtom, matsAtom, mudancaAtom, pageAtom, sortAtom } from '../../atomStore';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useQuery, useQueryClient} from '@tanstack/react-query'

const Entrada = () => {
    // const [entradas, setEntradas] = useState([]); //*
    // const [metaEntradas, setMetaEntradas] = useState({}); //*
    // const [carregando, setCarregando] = useState(true);
    const [carregandoEdicao, setCarregandoEdicao] = useState(false);
    const [openEditar, setOpenEditar] = useState(false);
    const [openConfirmar, setOpenConfirmar] = useState(false);
    
    const [entradaMaterial, setEntradaMaterial] = useState({});
    const [cursor, setCursor] = useState('auto');
    const [errors, setErrors] = useState({});
    const [openDetalhes, setOpenDetalhes] = useState(false);
    
    const setOpenExcluir = useSetAtom(excluirAtom);
    const sort = useAtomValue(sortAtom);
    const page = useAtomValue(pageAtom);
    const filtros = useAtomValue(filtrosAtom);
    const materiais = useAtomValue(matsAtom);
    const setHouveMudanca = useSetAtom(mudancaAtom);

    const queryClient = useQueryClient();
    const entradas = useQuery(['entradaItens', page, filtros, sort], () => getTabela('entradas', page, filtros, sort));

    return (
        <Box sx={{ cursor: cursor }}>
            <EntradaMaterial 
                entradas={entradas?.data?.data} 
                metaEntradas={entradas?.data?.meta} 
                carregando={entradas?.isLoading}
                setOpenEditar={setOpenEditar}
                setEntradaMaterial={setEntradaMaterial}
                setCursor={setCursor}
                cursor={cursor}
                setOpenDetalhes={setOpenDetalhes}
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
                setCarregando={setCarregandoEdicao}
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