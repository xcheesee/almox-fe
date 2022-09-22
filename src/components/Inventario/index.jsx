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
        setFiltros,
        setRegistro,
        cursor,
        setCursor
    } = props;
    
    return (
        <ContainerPrincipal>
            <Titulo carregando={carregando}>
                Inventário
            </Titulo>

            <FiltrosInventario
                setFiltros={setFiltros}
                setPage={setPage}            
            />

            <TabelaInventario
                itens={itens}
                metaItens={metaItens}
                setIdAlerta={setIdAlerta}
                setOpenDefinir={setOpenDefinir}
                carregando={carregando}
                setRegistro={setRegistro}
                cursor={cursor}
                setCursor={setCursor}
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