import React, { useState } from 'react';
import { 
    Box,
    Button,
    CircularProgress
} from '@mui/material';
import ContainerPrincipal from '../../ContainerPrincipal';
import Titulo from '../../Titulo';
import FormSaida from '../FormSaida';

const NovaSaidaMats = (props) => {
    const {
        materiais,
        setMateriais,
        setOpenCancelar,
        setOpenConfirmar,
        carregando,
        setCarregando,
        navigate,
        //baseSelecionada,
        //setBaseSelecionada,
    } = props;

    const [errors, setErrors] = useState({});
    
    return (
        <ContainerPrincipal>
            <Titulo voltaPara="/saida">
                Nova Saída de Materiais
            </Titulo>

            <FormSaida 
                acao='cadastrar' 
                navigate={navigate} 
                setOpenConfirmar={setOpenConfirmar}
                setCarregando={setCarregando} 
                materiais={materiais}
                setMateriais={setMateriais}
                errors={errors}
                setErrors={setErrors}
                //baseSelecionada={baseSelecionada}
                //setBaseSelecionada={setBaseSelecionada}
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

export default NovaSaidaMats;