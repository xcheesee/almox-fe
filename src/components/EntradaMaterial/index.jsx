import React from 'react';
import ContainerPrincipal from '../ContainerPrincipal';
import Titulo from '../Titulo';
import FiltrosEntrada from './FiltrosEntrada';
import TabelaEntrada from './TabelaEntrada';
import BotaoNovo from '../BotaoNovo';
import Paginacao from '../Paginacao';
import { authCreateEntrada, getTabela } from '../../common/utils';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { filtrosAtom, pageAtom, sortAtom } from '../../atomStore';
import { useRef } from 'react';
import { useAuthenticatedQuery } from '../../common/utils/hooks';

const EntradaMaterial = (props) => {
    const {
        getSelectedEntradaInfo,
        cursor,
    } = props;

    const sort = useAtomValue(sortAtom);
    const page = useAtomValue(pageAtom);
    const filtros = useAtomValue(filtrosAtom);

    const entradas = useAuthenticatedQuery({
        queryKey: ['entradaItens', page, filtros, sort],
        queryFn: () => getTabela('entradas', page, filtros, sort),
        onSuccess: res => pageCountRef.current = res.meta.last_page
    });

    const pageCountRef = useRef(entradas?.data?.meta?.last_page ?? 1)

    return (
        <ContainerPrincipal>
            <Titulo 
                voltaPara="/principal" 
                carregando={entradas.isLoading}
            >
                Entrada de material
            </Titulo>

            <FiltrosEntrada />

            <BotaoNovo 
                caminho="/entrada/nova-entrada" 
                display={authCreateEntrada(localStorage.getItem('perfil'))}
            >
                Nova entrada
            </BotaoNovo>
            
            <TabelaEntrada 
                entradas={entradas?.data?.data} 
                carregando={entradas.isLoading}
                getSelectedEntradaInfo={getSelectedEntradaInfo}
                cursor={cursor}
            />

            <Paginacao
                count={pageCountRef.current}
            />
        </ContainerPrincipal>
    );
}

export default EntradaMaterial;