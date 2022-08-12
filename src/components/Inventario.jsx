import React from 'react';
import { Box, Pagination, TextField } from '@mui/material';
import ContainerPrincipal from './ContainerPrincipal';
import Titulo from './Titulo';
import Filtros from './Filtros';
import TabelaInventario from './TabelaInventario';

const Inventario = () => {
    return (
        <ContainerPrincipal>
            <Titulo>
                Inventário
            </Titulo>
            
            <Filtros>
                <TextField 
                    label="Base"
                    size="small"
                    helperText=" "
                />

                <TextField 
                    label="Nome do item"
                    size="small"
                    helperText=" "
                />

                <TextField 
                    label="Tipo de item"
                    size="small"
                    helperText=" "
                />

                <TextField 
                    label="Tipo de medida"
                    size="small"
                    helperText=" "
                />

                <TextField 
                    label="Quantidade maior que"
                    size="small"
                    helperText=" "
                />

                <TextField 
                    label="Quantidade menor que"
                    size="small"
                    helperText=" "
                />
            </Filtros>

            <TabelaInventario />

            <Box className="flex justify-center my-4 mt-10">
                <Pagination count={5} shape="rounded" color="primary" />
            </Box>
        </ContainerPrincipal>

    );
}

export default Inventario;