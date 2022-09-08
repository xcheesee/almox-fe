import React from 'react';
import { 
    MenuItem,
    TextField,
    Box,
    Typography 
} from '@mui/material';
import FormContainer from '../FormContainer';
import Selecao from '../Selecao';
import style from './style';

const departamentos = JSON.parse(localStorage.getItem('departamentos'));

const FormOrdemServico = ({ onSubmit, defaultValue }) => (
    <FormContainer
        id="nova-ordem"
        onSubmit={onSubmit}
    >
        <Selecao
            label="Departamento"
            name="departamento_id"
            defaultValue={defaultValue?.departamento_id}
        >
            {Object.entries(departamentos).map(departamento => (
                <MenuItem key={departamento[0]} value={departamento[0]}>
                    {departamento[1]}
                </MenuItem>
            ))}
        </Selecao>

        <TextField 
            defaultValue={defaultValue?.data_inicio_servico}
            type="datetime-local"
            name="data_inicio_servico"
            label="Data de início do serviço"
            InputLabelProps={{ shrink: true }}
            fullWidth
        />

        <TextField 
            defaultValue={defaultValue?.data_fim_servico}
            type="datetime-local"
            name="data_fim_servico"
            label="Data de fim do serviço"
            InputLabelProps={{ shrink: true }}
            fullWidth
        />

        <Selecao
            label="Base de origem dos materiais"
            name="origem_id"
            defaultValue={defaultValue?.origem_id}
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
            defaultValue={defaultValue?.local_servico_id}
        >
            <MenuItem value={1}>Teste 1</MenuItem>
            <MenuItem value={2}>Teste 2</MenuItem>
            <MenuItem value={3}>Teste 3</MenuItem>
            <MenuItem value={4}>Teste 4</MenuItem>
            <MenuItem value={5}>Teste 5</MenuItem>
        </Selecao>

        <TextField 
            defaultValue={defaultValue?.especificacao}
            name="especificacao"
            label="Especificação"
            multiline
            minRows={4}
            fullWidth
        />

        <Selecao
            name="profissional"
            label="Profissional"
            defaultValue={defaultValue?.profissional}
        >
            <MenuItem value="Fulano">Fulano</MenuItem>
            <MenuItem value="Sicrano">Sicrano</MenuItem>
            <MenuItem value="Beltrano">Beltrano</MenuItem>
            <MenuItem value="José">José</MenuItem>
            <MenuItem value="Maria">Maria</MenuItem>
        </Selecao>

        <TextField 
            defaultValue={defaultValue?.horas_execucao}
            name="horas_execucao"
            label="Horas de serviço"
            fullWidth
        />

        <TextField 
            defaultValue={defaultValue?.observacoes}
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
                    defaultValue={defaultValue?.almoxarife_nome}
                    name="almoxarife_nome"
                    label="Nome"
                    fullWidth
                />

                <TextField 
                    defaultValue={defaultValue?.almoxarife_email}
                    name="almoxarife_email"
                    label="E-mail"
                    type="email"
                    fullWidth
                />
            </Box>
        </Box>
    </FormContainer>
);

export default FormOrdemServico;