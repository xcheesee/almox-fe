import React from 'react';
import { Box } from '@mui/material';
import ContainerPrincipal from '../ContainerPrincipal';
import Titulo from '../Titulo';
import FiltrosInventario from '../FiltrosInventario';
import TabelaInventario from '../TabelaInventario';
import Paginacao from '../Paginacao';

const Inventario = (props) => {
    const { 
        itens,
        metaItens,
        carregando,
        cursor,
        inventarioItemDefinirAlerta,
    } = props;
    
    return (
        <ContainerPrincipal>
            <Titulo carregando={carregando}>
                Inventário
            </Titulo>

            <FiltrosInventario />

            <TabelaInventario
                itens={itens}
                inventarioItemDefinirAlerta={inventarioItemDefinirAlerta}
                carregando={carregando}
                cursor={cursor}
            />

            <Box className="mt-10">
                <Paginacao 
                    count={metaItens?.last_page}
                />
            </Box>
        </ContainerPrincipal>

    );
}

export default Inventario;