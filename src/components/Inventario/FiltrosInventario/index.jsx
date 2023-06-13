import React from 'react';
import { TextField } from '@mui/material';
import Filtros from '../../Filtros';

const FiltrosInventario = () => {
    return (
        <Filtros>
            <TextField
                label="Base"
                name="base"
                InputLabelProps={{ shrink: true }}
            />

            <TextField
                label="Nome do item"
                name="item"
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
    );
}

export default FiltrosInventario;