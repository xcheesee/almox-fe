import React from 'react';
import { Box, Pagination, TextField } from '@mui/material';
import ContainerPrincipal from './ContainerPrincipal';
import Titulo from './Titulo';
import Filtros from './Filtros';
import TabelaInventario from './TabelaInventario';

const Inventario = ({ setIdAlerta, setOpenDefinir }) => {
    return (
        <ContainerPrincipal>
            <Titulo>
                Inventário
            </Titulo>

            <Filtros>
                <TextField
                    label="Base"
                    name="base"
                    InputLabelProps={{ shrink: true }}
                />

                <TextField
                    label="Nome do item"
                    name="nome_item"
                    InputLabelProps={{ shrink: true }}
                />

                <TextField
                    label="Tipo de item"
                    name="tipo_item"
                    InputLabelProps={{ shrink: true }}
                />

                <TextField
                    label="Tipo de medida"
                    name="tipo_medida"
                    InputLabelProps={{ shrink: true }}
                />

                <TextField
                    label="Quantidade maior que"
                    name="quantidade_maior_que"
                    InputLabelProps={{ shrink: true }}
                />

                <TextField
                    label="Quantidade menor que"
                    name="quantidade_menor_que"
                    InputLabelProps={{ shrink: true }}
                />
            </Filtros>

            <TabelaInventario
                setIdAlerta={setIdAlerta}
                setOpenDefinir={setOpenDefinir}
            />

            <Box className="flex justify-center my-4 mt-10">
                <Pagination count={5} shape="rounded" color="primary" />
            </Box>
        </ContainerPrincipal>

    );
}

export default Inventario;