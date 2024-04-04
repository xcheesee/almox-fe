import React from 'react';
import { 
    Box,
    Button,
    CircularProgress
} from '@mui/material';
import ContainerPrincipal from '../../ContainerPrincipal';
import Titulo from '../../Titulo';
import DialogEnviar from '../../DialogEnviar';

const NovaSaidaContainer = (props) => {
    const {
        setOpenCancelar,
        openConfirmar,
        setOpenConfirmar,
        carregando,
        formId,
        children
    } = props;

    return (
        <>
            <ContainerPrincipal>
                <Titulo voltaPara="/saida">
                    Nova Saída de Materiais
                </Titulo>

                {children}

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

            <DialogEnviar 
                openConfirmar={openConfirmar}
                setOpenConfirmar={setOpenConfirmar}
                texto="saída de materiais"
                form={formId}
            />
        </>
    );
}

export default NovaSaidaContainer;