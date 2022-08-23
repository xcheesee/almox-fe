import React from 'react';
import { TextField, Box, Button, Pagination } from '@mui/material';
import ContainerPrincipal from '../ContainerPrincipal';
import Titulo from '../Titulo';
import Filtros from '../Filtros';
import TabelaEntrada from '../TabelaEntrada';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

const EntradaMaterial = (props) => {
    return (
        <ContainerPrincipal>
            <Titulo voltaPara="/principal">
                Entrada de material
            </Titulo>

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

            <TabelaEntrada />

            <Box className="flex justify-end py-8">
                <Link to="/entrada/nova-entrada">
                    <Button variant="contained">
                        <AddIcon className="mr-1" size="small" />
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