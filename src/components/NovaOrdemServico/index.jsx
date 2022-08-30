import React from 'react';
import { 
    TextField,
    MenuItem,
    Box,
    Button,
    Typography
} from '@mui/material';
import style from './style';
import { enviaForm } from '../../common/utils';
import ContainerPrincipal from '../ContainerPrincipal';
import Titulo from '../Titulo';
import FormContainer from '../FormContainer';
import Selecao from '../Selecao';
import BoxMateriais from '../BoxMateriais';

const NovaOrdemServico = (props) => {
    const {
        materiais,
        setMateriais,
        setOpenCancelar
    } = props;

    const departamentos = JSON.parse(localStorage.getItem('departamentos'));

    return (
        <ContainerPrincipal>
            <Titulo voltaPara="/ordemservico">
                Nova ordem de serviço
            </Titulo>

            <FormContainer
                id="nova-ordem"
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
                    name="data_inicio_servico"
                    label="Data de início do serviço"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                />

                <TextField 
                    type="date"
                    name="data_fim_servico"
                    label="Data de fim do serviço"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                />

                <Selecao
                    label="Base de origem dos materiais"
                    name="origem_id"
                >
                    <MenuItem value={1}>Teste 1</MenuItem>
                    <MenuItem value={2}>Teste 2</MenuItem>
                    <MenuItem value={3}>Teste 3</MenuItem>
                    <MenuItem value={4}>Teste 4</MenuItem>
                    <MenuItem value={5}>Teste 5</MenuItem>
                </Selecao>

                <Selecao
                    label="Local de serviço"
                    name="local_servico_id"
                >
                    <MenuItem value={1}>Teste 1</MenuItem>
                    <MenuItem value={2}>Teste 2</MenuItem>
                    <MenuItem value={3}>Teste 3</MenuItem>
                    <MenuItem value={4}>Teste 4</MenuItem>
                    <MenuItem value={5}>Teste 5</MenuItem>
                </Selecao>

                <TextField 
                    name="especificacao"
                    label="Especificação"
                    multiline
                    minRows={4}
                    fullWidth
                />

                <Selecao
                    name="profissional"
                    label="Profissional"
                >
                    <MenuItem value={1}>Fulano</MenuItem>
                    <MenuItem value={2}>Sicrano</MenuItem>
                    <MenuItem value={3}>Beltrano</MenuItem>
                    <MenuItem value={4}>José</MenuItem>
                    <MenuItem value={5}>Maria</MenuItem>
                </Selecao>

                <TextField 
                    name="horas_execucao"
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
                        sx={style.subtituloForm} 
                    >
                        Almoxarife responsável
                    </Typography>
                    
                    <Box 
                        className="flex flex-col gap-10 my-4"
                    >
                        <TextField 
                            name="almoxarife_nome"
                            label="Nome"
                            fullWidth
                        />

                        <TextField 
                            name="almoxarife_email"
                            label="E-mail"
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
                <Button onClick={() => setOpenCancelar(true)}>
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