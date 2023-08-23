import React from 'react';
import ContainerPrincipal from '../ContainerPrincipal';
import Titulo from '../Titulo';
import FiltrosSaida from './FiltrosSaida';
import TabelaSaida from './TabelaSaida';
import BotaoNovo from '../BotaoNovo';
import Paginacao from '../Paginacao';
import { getTabela } from '../../common/utils';
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

    const saidas = useQuery({
        queryKey: ['saidas', page, filtros, sort],
        queryFn: () => getTabela('saidas', page, filtros, sort),
        onSuccess: res => {
            pageCountRef.current = res.meta.last_page
        }
    });

    const pageCountRef = useRef(saidas?.data?.meta?.last_page ?? 1)

    return (
        <ContainerPrincipal carregando={saidas.isLoading}>
            <Titulo carregando={saidas.isLoading}>Saída de Materiais</Titulo>

            <FiltrosSaida />

            <BotaoNovo caminho="/saida/nova-saida" >
                Nova Saida
            </BotaoNovo>

            <TabelaSaida 
                saidas={saidas?.data?.data} 
                carregando={saidas.isLoading} 
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
