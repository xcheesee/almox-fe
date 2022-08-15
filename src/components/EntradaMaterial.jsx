import React from 'react';
import ContainerPrincipal from './ContainerPrincipal';
import { TextField, Box, Button, Pagination } from '@mui/material';
import Titulo from './Titulo';
import Filtros from './Filtros';
import TabelaEntrada from './TabelaEntrada';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

const EntradaMaterial = (props) => {
    return (
        <ContainerPrincipal>
            <Titulo pathVoltar="/principal">
                Entrada de material
            </Titulo>

            <Filtros>
                <TextField 
                    label="Processo SEI"
                    size="small"
                    helperText=" "
                />

                <TextField 
                    label="Número contrato"
                    size="small"
                    helperText=" "
                />

                <TextField 
                    label="Base"
                    size="small"
                    helperText=" "
                />

                <TextField 
                    label="Número nota fiscal"
                    size="small"
                    helperText=" "
                />

                <TextField 
                    label="Entrada depois de"
                    size="small"
                    helperText=" "
                />

                <TextField 
                    label="Entrada antes de"
                    size="small"
                    helperText=" "
                />
            </Filtros>

            <TabelaEntrada />

            <Box className="flex justify-end">
                <Link to="/entrada/nova-entrada">
                    <Button variant="contained" sx={{ margin: '2rem 0' }}>
                        <AddIcon sx={{ mr: '0.2rem' }} size="small" />
                        Nova entrada
                    </Button>
                </Link>
            </Box>

            <Box className="flex justify-center my-4">
                <Pagination count={5} shape="rounded" color="primary" />
            </Box>
        </ContainerPrincipal>
    );
}

export default EntradaMaterial;