import React from 'react';
import { 
    TextField,
    MenuItem,
    Box,
    Button,
    Typography
} from '@mui/material';
import { enviaForm } from '../helpers';
import ContainerPrincipal from './ContainerPrincipal';
import Titulo from './Titulo';
import FormContainer from './FormContainer';
import Selecao from './Selecao';
import BoxMateriais from './BoxMateriais';

const NovaOrdemServico = (props) => {
    const {
        materiais,
        setMateriais
    } = props;

    return (
        <ContainerPrincipal>
            <Titulo voltaPara="/ordemservico">
                Nova ordem de serviço
            </Titulo>

            <FormContainer
                id="nova-ordem"
                onSubmit={(e) => enviaForm(e, materiais)}
            >
                <TextField 
                    type="date"
                    name="data_servico"
                    label="Data do serviço"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                />

                <Selecao
                    label="Base de origem dos materiais"
                    name="base_origem"
                >
                    <MenuItem value="Teste_1">Teste 1</MenuItem>
                    <MenuItem value="Teste_2">Teste 2</MenuItem>
                    <MenuItem value="Teste_3">Teste 3</MenuItem>
                    <MenuItem value="Teste_4">Teste 4</MenuItem>
                    <MenuItem value="Teste_5">Teste 5</MenuItem>
                </Selecao>

                <Selecao
                    label="Base de destino dos materiais"
                    name="base_destino"
                >
                    <MenuItem value="Teste_1">Teste 1</MenuItem>
                    <MenuItem value="Teste_2">Teste 2</MenuItem>
                    <MenuItem value="Teste_3">Teste 3</MenuItem>
                    <MenuItem value="Teste_4">Teste 4</MenuItem>
                    <MenuItem value="Teste_5">Teste 5</MenuItem>
                </Selecao>

                <Selecao
                    label="Local de serviço"
                    name="local_servico"
                >
                    <MenuItem value="Teste_1">Teste 1</MenuItem>
                    <MenuItem value="Teste_2">Teste 2</MenuItem>
                    <MenuItem value="Teste_3">Teste 3</MenuItem>
                    <MenuItem value="Teste_4">Teste 4</MenuItem>
                    <MenuItem value="Teste_5">Teste 5</MenuItem>
                </Selecao>

                <TextField 
                    name="especificacao"
                    label="Especificação"
                    multiline
                    minRows={4}
                    fullWidth
                />

                <TextField 
                    name="profissional"
                    label="Profissional"
                    fullWidth
                />

                <TextField 
                    name="hora_servico"
                    label="Hora de serviço"
                    fullWidth
                />

                <TextField 
                    name="observacoes"
                    label="Serviços extras/obervações"
                    multiline
                    minRows={4}
                    fullWidth
                />

                <Box>
                    <Typography 
                        sx={{
                            color: (theme) => theme.palette.color.bg, 
                            fontSize: '1.3rem', 
                            fontWeight: 'light',
                            mb: '0.5rem'
                        }} 
                    >
                        Almoxarife responsável
                    </Typography>
                    
                    <Box 
                        className="flex flex-col gap-10 my-4"
                    >
                        <TextField 
                            name="nome_almoxarife"
                            label="Nome"
                            fullWidth
                        />

                        <TextField 
                            name="email_almoxarife"
                            label="E-mail"
                            fullWidth
                        />
                        <TextField 
                            name="telefone_almoxarife"
                            label="Telefone"
                            fullWidth
                        />
                    </Box>
                </Box>
            </FormContainer>
            
            <BoxMateriais 
                label="Material utilizado"
                materiais={materiais}
                setMateriais={setMateriais}
            />

            <Box className="flex justify-end gap-4">
                <Button>
                    Cancelar
                </Button>
                <Button 
                    type="submit" 
                    form="nova-ordem" 
                    variant="contained"
                >
                    Enviar
                </Button>
            </Box>
        </ContainerPrincipal>
    );
}

export default NovaOrdemServico;