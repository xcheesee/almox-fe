import React from 'react';
import { TextField } from '@mui/material';
import Filtros from '../Filtros';

const FiltrosEntrada = () => {
    return (
        <Filtros>
            <TextField 
                label="Processo SEI"
                name="processo_sei"
                InputLabelProps={{ shrink: true }}
            />

            <TextField 
                label="Número contrato"
                name="numero_contrato"
                InputLabelProps={{ shrink: true }}
            />

            <TextField 
                label="Base"
                name="base"
                InputLabelProps={{ shrink: true }}
            />

            <TextField 
                label="Número nota fiscal"
                name="nota_fiscal"
                InputLabelProps={{ shrink: true }}
            />

            <TextField 
                label="Entrada depois de"
                name="entrada_depois_de"
                type="date"
                InputLabelProps={{ shrink: true }}
            />

            <TextField 
                label="Entrada antes de"
                name="entrada_antes_de"
                type="date"
                InputLabelProps={{ shrink: true }}
            />
        </Filtros>
    );
}

export default FiltrosEntrada;