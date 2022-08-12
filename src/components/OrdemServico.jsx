import React from 'react';
import { Box, TextField, Button, Pagination } from '@mui/material';
import ContainerPrincipal from './ContainerPrincipal';
import Titulo from './Titulo';
import Filtros from './Filtros';
import TabelaOrdem from './TabelaOrdem';
import AddIcon from '@mui/icons-material/Add';

const OrdemServico = () => {
    return (
        <ContainerPrincipal>
            <Titulo>Ordem de serviço</Titulo>

            <Filtros>
                <TextField 
                    label="Base origem do pedido"
                    size="small"
                    helperText=" "
                />

                <TextField 
                    label="Base destino do pedido"
                    size="small"
                    helperText=" "
                />

                <TextField 
                    label="Local de serviço"
                    size="small"
                    helperText=" "
                />

                <TextField 
                    label="Nome almoxarife responsável"
                    size="small"
                    helperText=" "
                />

                <TextField 
                    label="E-mail almoxarife responsável"
                    size="small"
                    helperText=" "
                />

                <TextField 
                    label="Cargo almoxarife responsável"
                    size="small"
                    helperText=" "
                />

                <TextField 
                    label="Data serviço depois de"
                    size="small"
                    helperText=" "
                />

                <TextField 
                    label="Data serviço antes de"
                    size="small"
                    helperText=" "
                />
            </Filtros>

            <TabelaOrdem />

            <Box className="flex justify-end">
                <Button variant="contained" sx={{ textTransform: 'none', margin: '2rem 0' }}>
                    <AddIcon sx={{ mr: '0.2rem' }} size="small" />
                    Nova entrada
                </Button>
            </Box>

            <Box className="flex justify-center my-4">
                <Pagination count={5} shape="rounded" color="primary" />
            </Box>
        </ContainerPrincipal>
    );
}

export default OrdemServico;