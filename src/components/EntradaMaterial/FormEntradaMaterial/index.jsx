import React, { useEffect, useState } from 'react';
import { 
    MenuItem,
    TextField,
} from '@mui/material';
import FormContainer from '../../FormContainer';
import CampoLocais from '../../CampoLocais';
import CampoProcessoSei from '../../CampoProcessoSei';
import CampoNumContrato from '../../CampoNumContrato';
import { enviaEdicao, enviaNovoForm, setFormSnackbar } from '../../../common/utils';
import { useSetAtom } from 'jotai';
import { snackbarAtom } from '../../../atomStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import MateriaisBox from '../../MateriaisBox';
import { useNavigate } from 'react-router-dom';
import ConditionalTooltip from '../../ConditionalTooltip';

const FormEntradaMaterial = ({
    defaultValue={}, 
    setOpenEditar=()=>{}, 
    setOpenConfirmar, 
    acao,
    setCarregando,
    materiais=[],
}) => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const [deptoSelecionado, setDeptoSelecionado] = useState("")
    const [baseSelecionada, setBaseSelecionada] = useState(defaultValue?.local_id ?? "")
    const [errors, setErrors] = useState({});

    const setSnackbar = useSetAtom(snackbarAtom)

    const editMutation = useMutation(async (formData) => {
        setOpenConfirmar(false)
        setCarregando(true)
        return await enviaEdicao(
            formData, 
            'entrada', 
            defaultValue.id, 
        )
    }, {
            onSuccess: async (res) => {
                setOpenEditar(false)
                queryClient.invalidateQueries(['entradaItens'])
                setFormSnackbar(setSnackbar, "Entrada de material", { edit: true })
            }, 
            onError: async (res) => {
                setFormSnackbar(setSnackbar, "", { error: true, status: res.status, edit: true })
                setErrors(res?.errors)
            },
            onSettled: () => setCarregando(false)
        })

    const addMutation = useMutation(async (formData) => {
        setOpenConfirmar(false)
        setCarregando(true)
        return await enviaNovoForm(
            formData, 
            'entrada', 
        )
    }, {
            onSuccess: async (res) => {
                queryClient.invalidateQueries(['entradaItens'])
                setFormSnackbar(setSnackbar, "Entrada de material")
                navigate(`/entrada`, { replace: true });
            }, onError: async (res) => {
                setFormSnackbar(setSnackbar, "", { error: true, status: res.status })
                setErrors(res?.errors)
            }, onSettled: () => setCarregando(false)
        })

    const departamentos = JSON.parse(localStorage.getItem('departamentos'));
    const departamentoKeys = Object.keys(departamentos)

    useEffect(() => {
        if(acao === 'editar') {
            setDeptoSelecionado(defaultValue?.departamento_id)
        } else if (departamentoKeys.length === 1) {
            setDeptoSelecionado(departamentoKeys[0])
        }
    }, [])

    return (
            <FormContainer
                id="nova-entrada"
                onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.target)
                    acao === 'editar'
                        ? editMutation.mutate(formData)
                        : addMutation.mutate(formData)
                }}
            >
                <TextField
                    select
                    label="Departamento"
                    name="departamento_id"
                    defaultValue={  departamentoKeys.length === 1 ? departamentoKeys[0] : "" || defaultValue?.departamento_id }
                    onChange={ e => {
                        setDeptoSelecionado(e.target.value)
                    }}
                    error={ errors.hasOwnProperty('departamento_id') }
                    helperText={ errors?.departamento_id ?? " " }
                    required
                >
                    {Object.entries(departamentos).map(departamento => (
                        <MenuItem key={`depto-${departamento[0]}`} value={departamento[0]}>
                            {departamento[1]}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField 
                    defaultValue={defaultValue?.data_entrada}
                    type="date"
                    name="data_entrada"
                    label="Data de entrada dos materiais"
                    InputLabelProps={{ shrink: true }}
                    error={errors.hasOwnProperty('data_entrada')}
                    helperText={errors?.data_entrada || ""}
                    fullWidth
                    required
                />

                <ConditionalTooltip 
                    enabled={!deptoSelecionado}
                    texto={"Selecione um Departamento!"}
                >
                    <CampoLocais 
                        name="local_id"
                        label="Local de destino dos materiais"
                        tipo="base"
                        depto={deptoSelecionado}
                        onChange={(e) => setBaseSelecionada(e.target.value)}
                        value={baseSelecionada}
                        error={errors.hasOwnProperty('local_id')}
                        helperText={errors?.local_id || ""}
                        disabled={!deptoSelecionado}
                        required
                        restrito
                    />
                </ConditionalTooltip>

                <CampoProcessoSei 
                    name="processo_sei"
                    label="Processo SEI"
                    defaultValue={defaultValue?.processo_sei}
                    error={errors.hasOwnProperty('processo_sei')}
                    helperText={errors?.processo_sei || ""}
                    fullWidth
                />

                <CampoNumContrato 
                    name="numero_contrato"
                    label="Número do contrato"
                    defaultValue={defaultValue?.numero_contrato}
                    error={errors.hasOwnProperty('numero_contrato')}
                    helperText={errors?.numero_contrato || ""}
                    fullWidth
                />

                <TextField 
                    defaultValue={defaultValue?.numero_nota_fiscal}
                    name="numero_nota_fiscal"
                    label="Número da nota fiscal"
                    error={errors.hasOwnProperty('numero_nota_fiscal')}
                    helperText={errors?.numero_nota_fiscal || ""}
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
                    helperText={errors?.arquivo_nota_fiscal || ""}
                    fullWidth
                />

                <MateriaisBox 
                    deptoSelecionado={deptoSelecionado} 
                    defaultValue={materiais} 
                    inputName='entrada_items' 
                    entrada 
                    errors={errors}
                />
            </FormContainer>
    );
}

export default FormEntradaMaterial;
