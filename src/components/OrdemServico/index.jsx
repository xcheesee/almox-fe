import React from 'react';
import { Box, TextField, Button, Pagination } from '@mui/material';
import ContainerPrincipal from '../ContainerPrincipal';
import Titulo from '../Titulo';
import Filtros from '../Filtros';
import TabelaOrdem from '../TabelaOrdem';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

const OrdemServico = () => {
    return (
        <ContainerPrincipal>
            <Titulo>Ordem de serviço</Titulo>

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

            <TabelaOrdem />

            <Box className="flex justify-end py-8">
                <Link to="/ordemservico/nova-ordem">
                    <Button variant="contained">
                        <AddIcon className="mr-1" size="small" />
                        Nova ordem
                    </Button>
                </Link>
            </Box>

            <Box className="flex justify-center my-4">
                <Pagination count={5} shape="rounded" color="primary" />
            </Box>
        </ContainerPrincipal>
    );
}

export default OrdemServico;