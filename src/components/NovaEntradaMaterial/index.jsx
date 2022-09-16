import React from 'react';
import { 
    Box, 
    Button,
    CircularProgress
} from '@mui/material';
import ContainerPrincipal from '../ContainerPrincipal';
import Titulo from '../Titulo';
import FormEntradaMaterial from '../FormEntradaMaterial';

const NovaEntradaMaterial = (props) => {
    const {
        materiais,
        setMateriais,
        setOpenCancelar,
        setOpenConfirmar,
        carregando,
        setCarregando,
        navigate,
        setSnackbar,
    } = props;

    return (
        <ContainerPrincipal>
            <Titulo voltaPara="/entrada">
                Nova entrada de material
            </Titulo>
            
            <FormEntradaMaterial
                acao='cadastrar'
                navigate={navigate}
                setOpenConfirmar={setOpenConfirmar}
                setCarregando={setCarregando}
                materiais={materiais}
                setMateriais={setMateriais}
                setSnackbar={setSnackbar}
            />
            
            <Box className="flex justify-end gap-4">
                <Button onClick={() => setOpenCancelar(true)}>
                    Cancelar
                </Button>
                <Button 
                    onClick={() => setOpenConfirmar(true)}
                    variant="contained"
                >
                    {
                        carregando
                        ? <CircularProgress color="color" size='1rem' sx={{ mr: '0.5rem' }} />
                        : null
                    }

                    Enviar
                </Button>
            </Box>
        </ContainerPrincipal>
    );
}

export default NovaEntradaMaterial;