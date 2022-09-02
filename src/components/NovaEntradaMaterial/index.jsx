import React from 'react';
import { 
    Box, 
    TextField, 
    Button,
    MenuItem,
    CircularProgress
} from '@mui/material';
import ContainerPrincipal from '../ContainerPrincipal';
import Titulo from '../Titulo';
import BoxMateriais from '../BoxMateriais';
import FormContainer from '../FormContainer';
import Selecao from '../Selecao';

const NovaEntradaMaterial = (props) => {
    const {
        materiais,
        setMateriais,
        setOpenCancelar,
        setOpenConfirmar,
        carregando,
        cadastraEntrada
    } = props;
    
    const departamentos = JSON.parse(localStorage.getItem('departamentos'));

    return (
        <ContainerPrincipal>
            <Titulo voltaPara="/entrada">
                Nova entrada de material
            </Titulo>
            
            <FormContainer
                id="nova-entrada"
                onSubmit={cadastraEntrada}
            >
                <Selecao
                    label="Departamento"
                    name="departamento_id"
                >
                    {Object.entries(departamentos).map(departamento => (
                        <MenuItem key={departamento[0]} value={departamento[0]}>
                            {departamento[1]}
                        </MenuItem>
                    ))}
                </Selecao>

                <TextField 
                    type="date"
                    name="data_entrada"
                    label="Data de entrada dos materiais"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                />

                <Selecao 
                    label="Local de destino dos materiais" 
                    name="local_id"
                >
                    <MenuItem value={1}>Teste 1</MenuItem>
                    <MenuItem value={2}>Teste 2</MenuItem>
                    <MenuItem value={3}>Teste 3</MenuItem>
                    <MenuItem value={4}>Teste 4</MenuItem>
                    <MenuItem value={5}>Teste 5</MenuItem>
                </Selecao>

                <TextField 
                    name="processo_sei"
                    label="Processo SEI"
                    fullWidth
                />

                <TextField 
                    name="numero_contrato"
                    label="Número do contrato"
                    fullWidth
                />

                <TextField 
                    name="numero_nota_fiscal"
                    label="Número da nota fiscal"
                    fullWidth
                />

                <TextField 
                    name="arquivo_nota_fiscal"
                    label="Arquivo da nota fiscal"
                    type="file"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                />
            </FormContainer>
            
            <BoxMateriais 
                label="Materiais entregues" 
                materiais={materiais} 
                setMateriais={setMateriais} 
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