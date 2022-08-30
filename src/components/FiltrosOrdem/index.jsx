import React from 'react';
import { TextField } from '@mui/material';
import Filtros from '../Filtros';

const FiltrosOrdem = () => {
    return (
        <Filtros>
            <TextField 
                label="Base origem do pedido"
                name="base_origem_do_pedido"
                InputLabelProps={{ shrink: true }}
            />

            <TextField 
                label="Local de serviço"
                name="local_servico"
                InputLabelProps={{ shrink: true }}
            />

            <TextField 
                label="Nome almoxarife responsável"
                name="nome_almoxarife_responsavel"
                InputLabelProps={{ shrink: true }}
            />

            <TextField 
                label="E-mail almoxarife responsável"
                name="email_almoxarife_responsavel"
                InputLabelProps={{ shrink: true }}
            />

            <TextField 
                label="Data serviço"
                name="data_servico"
                type="date"
                className="col-span-2"
                InputLabelProps={{ shrink: true }}
            />
        </Filtros>
    );
}

export default FiltrosOrdem;