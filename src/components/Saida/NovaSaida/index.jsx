import React, { useState } from 'react';
import { 
    Box,
    Button,
    CircularProgress
} from '@mui/material';
import ContainerPrincipal from '../../ContainerPrincipal';
import Titulo from '../../Titulo';
import { FormNovaSaida } from '../FormSaida';
import DialogEnviar from '../../DialogEnviar';

const NovaSaidaMats = (props) => {
    const {
        setOpenCancelar,
        openConfirmar,
        setOpenConfirmar,
        carregando,
        setCarregando,
        formId,
    } = props;

    const [errors, setErrors] = useState({});
    
    return (
        <>
            <ContainerPrincipal>
                <Titulo voltaPara="/saida">
                    Nova Saída de Materiais
                </Titulo>

                <FormNovaSaida 
                    formId={formId}
                    setOpenConfirmar={setOpenConfirmar}
                    setCarregando={setCarregando} 
                    errors={errors}
                    setErrors={setErrors}
                />

                <Box className="flex justify-end gap-4">
                    <Button onClick={() => setOpenCancelar(true)}>
                        Cancelar
                    </Button>

                    <Button 
                        onClick={() => setOpenConfirmar(true)}
                        variant="contained"
                    >
                        {carregando
                            ? <CircularProgress color="color" size='1rem' sx={{ mr: '0.5rem' }} />
                            : null
                        }
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

export default NovaSaidaMats;