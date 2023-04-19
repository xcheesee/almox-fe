import React, { useEffect, useState } from 'react';
import { 
    MenuItem,
    TextField,
    Tooltip,
} from '@mui/material';
import FormContainer from '../FormContainer';
import Selecao from '../Selecao';
import BoxMateriaisEntrada from '../BoxMateriaisEntrada';
import CampoLocais from '../CampoLocais';
import CampoProcessoSei from '../CampoProcessoSei';
import CampoNumContrato from '../CampoNumContrato';
import BoxMateriais from '../BoxMateriais';
import { enviaEdicao, enviaNovoForm, setFormSnackbar } from '../../common/utils';
import { useAtom, useSetAtom } from 'jotai';
import { deptoAtom, snackbarAtom } from '../../atomStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const FormEntradaMaterial = (props) => {
    const setSnackbar = useSetAtom(snackbarAtom)
    const { 
        defaultValue, 
        setOpenEditar, 
        setOpenConfirmar, 
        navigate, 
        acao,
        setCarregando,
        errors,
        setErrors,
    } = props;

    const queryClient = useQueryClient()

    const [materiaisInterno, setMateriaisInterno] = useState([]); // evita renderizações desnecessárias
    const [deptoSelecionado, setDeptoSelecionado] = useAtom(deptoAtom)

    const editMutation = useMutation(async (data) => {
        setOpenConfirmar(false)
        setCarregando(true)
        return await enviaEdicao(
            data, 
            'entrada', 
            defaultValue.id, 
            materiaisInterno,
            'entrada_items'
        )
    }, {
        onSuccess: async (res) => {
            setOpenEditar(false)
            setCarregando(false)
            queryClient.invalidateQueries(['entradaItens'])
            setFormSnackbar(setSnackbar, "Entrada de material", { edit: true })
        }, 
        onError: async (res) => {
            setCarregando(false)
            if(res.status === 422) { /* setErrors(res?.errors) */ }
            setFormSnackbar(setSnackbar, "", { error: true, status: res.status, edit: true })
    }})

    const addMutation = useMutation(async (data) => {
        setOpenConfirmar(false)
        setCarregando(true)
        return await enviaNovoForm(
            data, 
            'entrada', 
            materiaisInterno,
            'entrada_items'
        )
    }, {
        onSuccess: async (res) => {
            setCarregando(false)
            queryClient.invalidateQueries(['entradaItens'])
            setFormSnackbar(setSnackbar, "Entrada de material")
            navigate(`/entrada`, { replace: true });
        }, onError: async (res) => {
            setCarregando(false)
            if(res.status === 422) { setErrors(res?.errors) }
            setFormSnackbar(setSnackbar, "", { error: true, status: res.status })
        }
    })

    useEffect(() => {
        setDeptoSelecionado('')//reseta o atom toda vez que o componente eh renderizado pela primeira vez
        if(acao === 'editar') {
            setDeptoSelecionado(defaultValue?.departamento_id)
        }
    }, [])

    const departamentos = JSON.parse(localStorage.getItem('departamentos'));
    const departamentoKeys = Object.keys(departamentos)

    return (
        <>
            <FormContainer
                id="nova-entrada"
                onSubmit={(e) => {
                    acao === 'editar'
                        ? editMutation.mutate(e)
                        : addMutation.mutate(e)
                }}
            >
                <Selecao
                    label="Departamento"
                    name="departamento_id"
                    defaultValue={  departamentoKeys.length === 1 ? departamentoKeys[0] : "" || defaultValue?.departamento_id }
                    //defaultValue={ defaultValue?.departamento_id }
                    onChange={ e => {
                        setDeptoSelecionado(e.target.value)
                    }}
                    error={ errors.hasOwnProperty('departamento_id') }
                    helperText={ errors.departamento_id || "" }
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
                    tipo="base"
                    depto={deptoSelecionado}
                    defaultValue={defaultValue?.local_id}
                    error={errors.hasOwnProperty('local_id')}
                    helperText={errors.local_id || ""}
                    required
                />

                <CampoProcessoSei 
                    name="processo_sei"
                    label="Processo SEI"
                    defaultValue={defaultValue?.processo_sei}
                    error={errors.hasOwnProperty('processo_sei')}
                    helperText={errors.processo_sei || ""}
                    required
                    fullWidth
                />

                <CampoNumContrato 
                    name="numero_contrato"
                    label="Número do contrato"
                    defaultValue={defaultValue?.numero_contrato}
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
                //<Tooltip title={`${deptoSelecionado === "" ? "Selecione um departamento antes de incluir itens!" : ""}`}>
                <BoxMateriais 
                    //materiais={materiaisInterno}
                    //setMateriais={setMateriaisInterno}
                    label="Materiais"
                    deptoSelecionado={deptoSelecionado}
                />
                //</Tooltip>
            }
        </>
    );
}

export default FormEntradaMaterial;
