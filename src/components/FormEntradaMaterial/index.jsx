import React from 'react';
import { 
    MenuItem,
    TextField,
} from '@mui/material';
import FormContainer from '../FormContainer';
import Selecao from '../Selecao';
import { enviaEdicao, enviaNovoForm } from '../../common/utils';

const departamentos = JSON.parse(localStorage.getItem('departamentos'));

const FormEntradaMaterial = ({ defaultValue, setCarregando, setOpenEditar, setOpenConfirmar, navigate, acao, materiais }) => {
    return (
        <FormContainer
            id="nova-entrada"
            onSubmit={(e) => {
                acao === 'editar'
                    ? enviaEdicao(
                        e, 
                        'entrada', 
                        defaultValue.id, 
                        setCarregando, 
                        setOpenEditar, 
                        setOpenConfirmar
                    )
                    : enviaNovoForm(
                        e, 
                        'entrada', 
                        'entrada', 
                        setCarregando, 
                        setOpenConfirmar, 
                        navigate,
                        materiais
                    )
            }}
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
                defaultValue={defaultValue?.data_entrada}
                type="date"
                name="data_entrada"
                label="Data de entrada dos materiais"
                InputLabelProps={{ shrink: true }}
                fullWidth
            />

            <Selecao 
                label="Local de destino dos materiais" 
                name="local_id"
                defaultValue={defaultValue?.local_id}
            >
                <MenuItem value={1}>Teste 1</MenuItem>
                <MenuItem value={2}>Teste 2</MenuItem>
                <MenuItem value={3}>Teste 3</MenuItem>
                <MenuItem value={4}>Teste 4</MenuItem>
                <MenuItem value={5}>Teste 5</MenuItem>
            </Selecao>

            <TextField 
                defaultValue={defaultValue?.processo_sei}
                name="processo_sei"
                label="Processo SEI"
                fullWidth
            />

            <TextField 
                defaultValue={defaultValue?.numero_contrato}
                name="numero_contrato"
                label="Número do contrato"
                fullWidth
            />

            <TextField 
                defaultValue={defaultValue?.numero_nota_fiscal}
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
    );
}

export default FormEntradaMaterial;