import React from 'react';
import { 
    Box, 
    TextField, 
    Button,
    MenuItem,
} from '@mui/material';
import { enviaForm } from '../../common/utils';
import ContainerPrincipal from '../ContainerPrincipal';
import Titulo from '../Titulo';
import BoxMateriais from '../BoxMateriais';
import FormContainer from '../FormContainer';
import Selecao from '../Selecao';

const NovaEntradaMaterial = (props) => {
    const {
        materiais,
        setMateriais,
        setOpenCancelar
    } = props;
    
    const departamentos = JSON.parse(localStorage.getItem('departamentos'));

    return (
        <ContainerPrincipal>
            <Titulo voltaPara="/entrada">
                Nova entrada de material
            </Titulo>
            
            <FormContainer
                id="nova-entrada"
                onSubmit={(e) => enviaForm(e, materiais)}
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
                    name="local_servico"
                >
                    <MenuItem value="Teste_1">Teste 1</MenuItem>
                    <MenuItem value="Teste_2">Teste 2</MenuItem>
                    <MenuItem value="Teste_3">Teste 3</MenuItem>
                    <MenuItem value="Teste_4">Teste 4</MenuItem>
                    <MenuItem value="Teste_5">Teste 5</MenuItem>
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
                    name="nota_fiscal"
                    label="Número da nota fiscal"
                    fullWidth
                />

                <TextField 
                    name="arquivo_nota_fiscal"
                    label="Arquivo da nota fiscal"
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
                    type="submit" 
                    form="nova-entrada" 
                    variant="contained"
                >
                    Enviar
                </Button>
            </Box>
        </ContainerPrincipal>
    );
}

export default NovaEntradaMaterial;