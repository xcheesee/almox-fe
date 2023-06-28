import React from 'react';
import ContainerPrincipal from '../ContainerPrincipal';
import Titulo from '../Titulo';
import FiltrosSaida from './FiltrosSaida';
import TabelaSaida from './TabelaSaida';
import BotaoNovo from '../BotaoNovo';
import Paginacao from '../Paginacao';
import { authCreateOrdem, getTabela } from '../../common/utils';
import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { filtrosAtom, pageAtom, sortAtom } from '../../atomStore';

const SaidaMats = (props) => {
    const {
        cursor,
        getSelectedOrdemInfo,
    } = props;

    const sort = useAtomValue(sortAtom);
    const filtros = useAtomValue(filtrosAtom);
    const page = useAtomValue(pageAtom);

    const ordens = useQuery({
        queryKey: ['ordemItens', page, filtros, sort],
        queryFn: () => getTabela('ordem_servicos', page, filtros, sort),
        onSuccess: res => pageCountRef.current = res.meta.last_page
    });

    const pageCountRef = useRef(ordens?.data?.meta?.last_page ?? 1)

    return (
        <ContainerPrincipal carregando={ordens.isLoading}>
            <Titulo carregando={ordens.isLoading}>Saída de Materiais</Titulo>

            <FiltrosSaida />

            {/*<BotaoNovo 
                caminho="/ordemservico/nova-ordem"
                display={authCreateOrdem(localStorage.getItem('perfil'))}    
            >
                Nova Saida
            </BotaoNovo>*/}

            <TabelaSaida 
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

export default SaidaMats;
