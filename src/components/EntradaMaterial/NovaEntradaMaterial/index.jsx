import React from 'react';
import { 
    Box, 
    Button,
    CircularProgress
} from '@mui/material';
import ContainerPrincipal from '../../ContainerPrincipal';
import Titulo from '../../Titulo';
import FormEntradaMaterial from '../FormEntradaMaterial';

const NovaEntradaMaterial = (props) => {
    const {
        setOpenCancelar,
        setOpenConfirmar,
        carregando,
        setCarregando,
    } = props;

    return (
        <ContainerPrincipal>
            <Titulo voltaPara="/entrada">
                Nova entrada de material
            </Titulo>
            
            <FormEntradaMaterial
                acao='cadastrar'
                setOpenConfirmar={setOpenConfirmar}
                setCarregando={setCarregando}
            />
            
            <Box className="flex justify-end gap-4">
                <Button onClick={() => setOpenCancelar(true)}>
                    Cancelar
                </Button>
                <Button 
                    onClick={() => setOpenConfirmar(true)}
                    variant="contained"
                >
                    { carregando && <CircularProgress color="color" size='1rem' sx={{ mr: '0.5rem' }} /> }
                    Enviar
                </Button>
            </Box>
        </ContainerPrincipal>
    );
}

export default NovaEntradaMaterial;