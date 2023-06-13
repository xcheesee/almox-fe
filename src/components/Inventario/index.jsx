import React from 'react';
import { Box } from '@mui/material';
import ContainerPrincipal from '../ContainerPrincipal';
import Titulo from '../Titulo';
import FiltrosInventario from '../FiltrosInventario';
import TabelaInventario from '../TabelaInventario';
import Paginacao from '../Paginacao';
import { useAtomValue } from 'jotai';
import { filtrosAtom, pageAtom, sortAtom } from '../../atomStore';
import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTabela } from '../../common/utils';

const Inventario = (props) => {
    const { 
        cursor,
        inventarioItemDefinirAlerta,
    } = props;

    const page = useAtomValue(pageAtom);
    const sort = useAtomValue(sortAtom);
    const filtros = useAtomValue(filtrosAtom);

    const itens = useQuery({
        queryKey: ['inventarioItens', page, filtros, sort],
        queryFn: () => getTabela('inventarios', page, filtros, sort),
        onSuccess: res => pageCountRef.current = res.meta.last_page
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

            <Box className="mt-10">
                <Paginacao 
                    count={pageCountRef.current}
                />
            </Box>
        </ContainerPrincipal>

    );
}

export default Inventario;