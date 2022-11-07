import React, { useState } from 'react';
import { Box } from '@mui/material';
import { getDetalhesBaixa, getMateriais, getOrdemProfissionais, getRegistro, getTabela } from '../../common/utils';
import OrdemServico from '../../components/OrdemServico';
import DialogEditar from '../../components/DialogEditar';
import DialogExcluir from '../../components/DialogExcluir';
import FormOrdemServico from '../../components/FormOrdemServico';
import DialogConfirmaEdicao from '../../components/DialogConfirmaEdicao';
import DialogDetalhesOrdem from '../../components/DialogDetalhesOrdem';
import DialogDetalhesBaixa from '../../components/DialogDetalhesBaixa';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { excluirAtom, filtrosAtom, matsAtom, /* mudancaAtom, */ pageAtom, profissionaisAtom, sortAtom } from '../../atomStore';
import { useQuery } from '@tanstack/react-query'

const Ordem = () => {
    const [carregandoEdicao, setCarregandoEdicao] = useState(false);
    const [openEditar, setOpenEditar] = useState(false);
    const [openConfirmar, setOpenConfirmar] = useState(false);
    const [ordemServico, setOrdemServico] = useState({});
    const [baixa, setBaixa] = useState({});
    const [cursor, setCursor] = useState('auto');
    const [errors, setErrors] = useState({});
    const [openDetalhes, setOpenDetalhes] = useState(false);
    const [openBaixa, setOpenBaixa] = useState(false);
    
    // const setHouveMudanca = useSetAtom(mudancaAtom);
    const setOpenExcluir = useSetAtom(excluirAtom);
    const sort = useAtomValue(sortAtom);
    const filtros = useAtomValue(filtrosAtom);
    const page = useAtomValue(pageAtom);
    const [materiais, setMateriais] = useAtom(matsAtom);
    const [profissionais, setProfissionais] = useAtom(profissionaisAtom);

    const ordens = useQuery(['ordemItens', page, filtros, sort], () => getTabela('ordem_servicos', page, filtros, sort));

    const getSelectedOrdemInfo = async (id, command) => {
        setCursor('progress')
        switch(command) {
            case 'visualizar':
                setOrdemServico(await getRegistro('ordem_servico', id, /* setOpenDetalhes, */ /* setOrdemServico, */ /* setCursor, */ /* setMateriais, */ /* setProfissionais, */))
                setMateriais(await getMateriais('ordem_servico', id))
                setProfissionais(await getOrdemProfissionais(id, ))
                setOpenDetalhes(true)
                break;
            case 'editar':
                setOrdemServico(await getRegistro('ordem_servico', id, /* setOpenEditar, */ /* setOrdemServico, */ /* setCursor, */ /* setMateriais, */ /* setProfissionais, */));
                setMateriais(await getMateriais('ordem_servico', id))
                setProfissionais(await getOrdemProfissionais(id, ))
                setOpenEditar(true)
                break;
            case 'baixa':
                setBaixa(await getDetalhesBaixa(id));
                setOpenBaixa(true);
                break;
            default:
                console.log('pog')
                break;
        }
        setCursor('auto')
    }

    return (
        <Box sx={{ cursor: cursor }}>
            <OrdemServico 
                ordens={ordens?.data}
                carregando={ordens?.isLoading}
                getSelectedOrdemInfo={getSelectedOrdemInfo}
                cursor={cursor}
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
                    materiais={materiais}
                    profissionais={profissionais}
                    acao="editar"
                    // setHouveMudanca={setHouveMudanca}
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
                // setHouveMudanca={setHouveMudanca}
            />
            <DialogDetalhesOrdem 
                openDetalhes={openDetalhes}
                profissionais={profissionais}
                setOpenDetalhes={setOpenDetalhes}
                ordem={ordemServico}
                materiais={materiais}
            />
            <DialogDetalhesBaixa 
                openBaixa={openBaixa}
                setOpenBaixa={setOpenBaixa}
                baixa={baixa}
            />
        </Box>
    );
}

export default Ordem;