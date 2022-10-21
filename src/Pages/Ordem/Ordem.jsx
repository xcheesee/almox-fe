import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { getTabela } from '../../common/utils';
import OrdemServico from '../../components/OrdemServico';
import DialogEditar from '../../components/DialogEditar';
import DialogExcluir from '../../components/DialogExcluir';
import FormOrdemServico from '../../components/FormOrdemServico';
import DialogConfirmaEdicao from '../../components/DialogConfirmaEdicao';
import DialogDetalhesOrdem from '../../components/DialogDetalhesOrdem';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { excluirAtom, filtrosAtom, matsAtom, pageAtom, sortAtom } from '../../atomStore';
import { useQuery, useQueryClient} from '@tanstack/react-query'

const Ordem = () => {
    // const [ordens, setOrdens] = useState([]);
    const [metaOrdens, setMetaOrdens] = useState({});
    const [carregando, setCarregando] = useState(true);
    const [carregandoEdicao, setCarregandoEdicao] = useState(false);
    const [openEditar, setOpenEditar] = useState(false);
    const [openConfirmar, setOpenConfirmar] = useState(false);
    const [ordemServico, setOrdemServico] = useState({});
    const [cursor, setCursor] = useState('auto');
    const [houveMudanca, setHouveMudanca] = useState(false);
    const [errors, setErrors] = useState({});
    const [openDetalhes, setOpenDetalhes] = useState(false);
    
    const sort = useAtomValue(sortAtom);
    const filtros = useAtomValue(filtrosAtom);
    const page = useAtomValue(pageAtom);
    const setOpenExcluir = useSetAtom(excluirAtom);
    const [materiais, setMateriais] = useAtom(matsAtom)

    const queryClient = useQueryClient()
    const ordens = useQuery(['ordemItens', page, filtros, sort], () => getTabela('ordem_servicos', page, filtros, sort))

    // useEffect(() => {
    //     getTabela('ordem_servicos', page, setCarregando, setOrdens, setMetaOrdens, filtros, sort);
    //     setMateriais([]);
    //     setErrors({});
    // }, [page, houveMudanca, filtros, sort, setMateriais])

    return (
        <Box sx={{ cursor: cursor }}>
            <OrdemServico 
                ordens={ordens?.data?.data}
                metaOrdens={ordens?.data?.meta}
                carregando={ordens?.isLoading}
                // setCarregando={setCarregando}
                setOpenEditar={setOpenEditar}
                setOrdemServico={setOrdemServico}
                setCursor={setCursor}
                setHouveMudanca={setHouveMudanca}
                cursor={cursor}
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
                    setHouveMudanca={setHouveMudanca}
                    errors={errors}
                    setErrors={setErrors}
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
                setOpenEditar={setOpenEditar}
                setCarregando={setCarregandoEdicao}
                setHouveMudanca={setHouveMudanca}
            />
            <DialogDetalhesOrdem 
                openDetalhes={openDetalhes}
                setOpenDetalhes={setOpenDetalhes}
                ordem={ordemServico}
                materiais={materiais}
            />
        </Box>
    );
}

export default Ordem;