import React from 'react';
import ContainerPrincipal from '../ContainerPrincipal';
import Titulo from '../Titulo';
import FiltrosOrdem from './FiltrosOrdem';
import TabelaOrdem from './TabelaOrdem';
import BotaoNovo from '../BotaoNovo';
import Paginacao from '../Paginacao';
import { authCreateOrdem, getTabela } from '../../common/utils';
import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue, useSetAtom } from 'jotai';
import { filtrosAtom, pageAtom, snackbarAtom, sortAtom } from '../../atomStore';

const OrdemServico = (props) => {
    const {
        cursor,
        getSelectedOrdemInfo,
    } = props;

    const sort = useAtomValue(sortAtom);
    const filtros = useAtomValue(filtrosAtom);
    const page = useAtomValue(pageAtom);
    const setSnackbar = useSetAtom(snackbarAtom)

    const ordens = useQuery({
        queryKey: ['ordemItens', page, filtros, sort],
        queryFn: () => getTabela('ordem_servicos', page, filtros, sort),
        onSuccess: res => pageCountRef.current = res.meta.last_page,
        onError: res => {
            setSnackbar({
                open: true,
                severity: 'error',
                message: res.message
            })
        }
    });

    const pageCountRef = useRef(ordens?.data?.meta?.last_page ?? 1)

    return (
        <ContainerPrincipal carregando={ordens.isLoading}>
            <Titulo carregando={ordens.isLoading}>Ordem de serviço</Titulo>

            <FiltrosOrdem />

            <BotaoNovo 
                caminho="/ordemservico/nova-ordem"
                display={authCreateOrdem(localStorage.getItem('perfil'))}    
            >
                Nova ordem
            </BotaoNovo>

            <TabelaOrdem 
                ordens={ordens?.data?.data} 
                carregando={ordens.isLoading} 
                getSelectedOrdemInfo={getSelectedOrdemInfo}
                cursor={cursor}
            />

            <Paginacao 
                count={pageCountRef.current}
            />
        </ContainerPrincipal>
    );
}

export default OrdemServico;
