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
        page,
        setPage,
        carregando,
        setIdAlerta, 
        setOpenDefinir,
    } = props;
    
    return (
        <ContainerPrincipal>
            <Titulo carregando={carregando}>
                Inventário
            </Titulo>

            <FiltrosInventario />

            <TabelaInventario
                itens={itens}
                metaItens={metaItens}
                setIdAlerta={setIdAlerta}
                setOpenDefinir={setOpenDefinir}
                carregando={carregando}
            />

            <Box className="mt-10">
                <Paginacao 
                    page={page}
                    setPage={setPage}
                    count={metaItens.last_page}
                />
            </Box>
        </ContainerPrincipal>

    );
}

export default Inventario;