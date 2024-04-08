import React from 'react';
import ContainerPrincipal from '../ContainerPrincipal';
import Titulo from '../Titulo';
import FiltrosInventario from './FiltrosInventario';
import TabelaInventario from './TabelaInventario';
import Paginacao from '../Paginacao';
import { useAtomValue, useSetAtom } from 'jotai';
import { filtrosAtom, pageAtom, snackbarAtom, sortAtom } from '../../atomStore';
import { useRef } from 'react';
import { getTabela } from '../../common/utils';
import { useAuthenticatedQuery } from '../../common/utils/hooks';

const Inventario = (props) => {
    const { 
        cursor,
        inventarioItemDefinirAlerta,
    } = props;

    const page = useAtomValue(pageAtom);
    const sort = useAtomValue(sortAtom);
    const filtros = useAtomValue(filtrosAtom);
    const setSnackbar = useSetAtom(snackbarAtom)

    const itens = useAuthenticatedQuery({
        queryKey: ['inventarioItens', page, filtros, sort],
        queryFn: () => getTabela('inventarios', page, filtros, sort),
        onSuccess: res => pageCountRef.current = res.meta.last_page,
        onError: error => setSnackbar({
            open: true,
            severity: 'error',
            message: `Nao foi possivel recuperar os dados do inventario: ${error.status} (${error.message ?? error.statusText})`
        })
        
    })

    const pageCountRef = useRef(itens?.data?.meta?.last_page ?? 1)
    
    return (
        <ContainerPrincipal>
            <Titulo carregando={itens.isLoading}>
                Inventário
            </Titulo>

            <FiltrosInventario />

            <TabelaInventario
                itens={itens?.data?.data}
                inventarioItemDefinirAlerta={inventarioItemDefinirAlerta}
                carregando={itens.isLoading}
                cursor={cursor}
            />

            <Paginacao 
                count={pageCountRef.current}
            />
        </ContainerPrincipal>
    );
}

export default Inventario;