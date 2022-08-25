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
                label="Base destino do pedido"
                name="base_destino_do_pedido"
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
                label="Cargo almoxarife responsável"
                name="cargo_almoxarife_responsavel"
                InputLabelProps={{ shrink: true }}
            />

            <TextField 
                label="Data serviço depois de"
                name="data_servico_depois_de"
                type="date"
                InputLabelProps={{ shrink: true }}
            />

            <TextField 
                label="Data serviço antes de"
                name="data_servico_antes_de"
                type="date"
                InputLabelProps={{ shrink: true }}
            />
        </Filtros>
    );
}

export default FiltrosOrdem;