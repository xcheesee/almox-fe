import React, { useState, useEffect } from 'react';
import { 
    MenuItem,
    TextField,
} from '@mui/material';
import FormContainer from '../FormContainer';
import Selecao from '../Selecao';
import BoxMateriais from '../BoxMateriais';
import { enviaEdicao, enviaNovoForm } from '../../common/utils';

const departamentos = JSON.parse(localStorage.getItem('departamentos'));

const FormEntradaMaterial = ({ defaultValue, setCarregando, setOpenEditar, setOpenConfirmar, navigate, acao, materiais, setSnackbar }) => {
    const [materiaisInterno, setMateriaisInterno] = useState(materiais); // evita renderizações desnecessárias
    
    useEffect(() => setMateriaisInterno(materiais), [materiais]);

    return (
        <>
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
                            setOpenConfirmar,
                            setSnackbar,
                            'Entrada de material',
                            materiaisInterno
                        )
                        : enviaNovoForm(
                            e, 
                            'entrada', 
                            'entrada', 
                            setCarregando, 
                            setOpenConfirmar, 
                            navigate,
                            materiaisInterno
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

            <BoxMateriais 
                label="Materiais entregues"
                materiais={materiaisInterno}
                setMateriais={setMateriaisInterno}
            />
        </>
    );
}

export default FormEntradaMaterial;