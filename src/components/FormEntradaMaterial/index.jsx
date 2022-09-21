import React, { useState, useEffect } from 'react';
import { 
    MenuItem,
    TextField,
} from '@mui/material';
import FormContainer from '../FormContainer';
import Selecao from '../Selecao';
import BoxMateriais from '../BoxMateriais';
import CampoLocais from '../CampoLocais';
import { enviaEdicao, enviaNovoForm } from '../../common/utils';

const departamentos = JSON.parse(localStorage.getItem('departamentos'));

const FormEntradaMaterial = (props) => {
    const { 
        defaultValue, 
        setCarregando, 
        setOpenEditar, 
        setOpenConfirmar, 
        navigate, 
        acao, 
        materiais, 
        setSnackbar, 
        setHouveMudanca, 
        errors,
        setErrors,
        locais,
        carregandoLocais
    } = props;

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
                            setHouveMudanca,
                            'entrada', 
                            defaultValue.id, 
                            setCarregando, 
                            setOpenEditar, 
                            setOpenConfirmar,
                            setSnackbar,
                            'Entrada de material',
                            setErrors,
                            materiaisInterno,
                            'entrada_items'
                        )
                        : enviaNovoForm(
                            e, 
                            'entrada', 
                            'entrada', 
                            setCarregando, 
                            setOpenConfirmar, 
                            navigate,
                            setSnackbar,
                            'Entrada de material',
                            setErrors,
                            materiaisInterno,
                            'entrada_items'
                        )
                }}
            >
                <Selecao
                    label="Departamento"
                    name="departamento_id"
                    defaultValue={defaultValue?.departamento_id}
                    error={errors.hasOwnProperty('departamento_id')}
                    helperText={errors.departamento_id || ""}
                    required
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
                    error={errors.hasOwnProperty('data_entrada')}
                    helperText={errors.data_entrada || ""}
                    fullWidth
                />

                <CampoLocais 
                    name="local_id"
                    label="Local de destino dos materiais"
                    locais={locais}
                    carregando={carregandoLocais}
                    defaultValue={defaultValue?.local_id}
                    error={errors.hasOwnProperty('local_id')}
                    helperText={errors.local_id || ""}
                    required
                />

                <TextField 
                    defaultValue={defaultValue?.processo_sei}
                    name="processo_sei"
                    label="Processo SEI"
                    error={errors.hasOwnProperty('processo_sei')}
                    helperText={errors.processo_sei || ""}
                    required
                    fullWidth
                />

                <TextField 
                    defaultValue={defaultValue?.numero_contrato}
                    name="numero_contrato"
                    label="Número do contrato"
                    error={errors.hasOwnProperty('numero_contrato')}
                    helperText={errors.numero_contrato || ""}
                    required
                    fullWidth
                />

                <TextField 
                    defaultValue={defaultValue?.numero_nota_fiscal}
                    name="numero_nota_fiscal"
                    label="Número da nota fiscal"
                    error={errors.hasOwnProperty('numero_nota_fiscal')}
                    helperText={errors.numero_nota_fiscal || ""}
                    required
                    fullWidth
                />

                <TextField 
                    name="arquivo_nota_fiscal"
                    label="Arquivo da nota fiscal"
                    type="file"
                    inputProps={{ accept: "image/*, application/pdf" }}
                    InputLabelProps={{ shrink: true }}
                    error={errors.hasOwnProperty('arquivo_nota_fiscal')}
                    helperText={errors.arquivo_nota_fiscal || ""}
                    fullWidth
                />
            </FormContainer>
            
            {acao === 'editar'
            ?
                ""
            :
                <BoxMateriais 
                    label="Materiais entregues"
                    materiais={materiaisInterno}
                    setMateriais={setMateriaisInterno}
                />
            }
        </>
    );
}

export default FormEntradaMaterial;