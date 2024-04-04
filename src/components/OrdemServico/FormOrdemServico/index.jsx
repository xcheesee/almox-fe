import React, { useState } from 'react';
import { 
    MenuItem,
    TextField,
    Box,
    Typography, 
    Paper,
} from '@mui/material';
import FormContainer from '../../FormContainer';
import CampoLocais from '../../CampoLocais';
import BoxProfissionais from '../../BoxProfissionais';
import { enviaEdicao, enviaNovoForm, setFormSnackbar } from '../../../common/utils';
import { snackbarAtom } from '../../../atomStore';
import { useSetAtom } from 'jotai';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import TituloTexto from '../../TituloTexto';
import { useLocation, useNavigate } from 'react-router-dom';
import MateriaisBox from '../../MateriaisBox';
import ConditionalTooltip from '../../ConditionalTooltip';

const FormOrdemServico = ({
    defaultValue, 
    setCarregando, 
    setOpenEditar, 
    setOpenConfirmar, 
    acao, 
    materiais=[],
    profissionais=[],
}) => {
    const queryClient = useQueryClient()
    const location = useLocation();

    const navigate = useNavigate()

    const [localServico, setLocalServico] = useState(defaultValue?.local_servico_id ?? "")
    const [baseSelecionada, setBaseSelecionada] = useState(defaultValue?.origem_id ?? "")
    const [deptoSelecionado, setDeptoSelecionado] = useState(defaultValue?.departamento_id ?? "")
    const [errors, setErrors] = useState({});

    const setSnackbar = useSetAtom(snackbarAtom)

    const departamentos = JSON.parse(localStorage.getItem('departamentos'));
    
    const editMutation = useMutation({
        mutationFn: async (formData) => {
            setOpenConfirmar(false)
            setCarregando(true)
            return await enviaEdicao(
                formData,
                'ordem_servico', 
                defaultValue.id, 
            )
        },
        onSuccess: async (res) => {
            setOpenEditar(false)
            queryClient.invalidateQueries(['ordemItens'])
            setFormSnackbar(setSnackbar, "Ordem de serviço", { edit: true })
        },
        onError: async (res) => {
            setFormSnackbar(setSnackbar, "", { error: true , status: res.status, edit: true })
            setErrors(res?.errors)
        },
        onSettled: () => setCarregando(false)
    })

    const addMutation = useMutation({
        mutationFn: async (formData) => {
            setOpenConfirmar(false)
            setCarregando(true)
            return await enviaNovoForm(
                formData, 
                'ordem_servico', 
            )
        },
        onSuccess: async (res) => {
            queryClient.invalidateQueries(['ordemItens'])
            setFormSnackbar(setSnackbar, "Ordem de serviço")
            navigate(`/ordemservico`, { replace: true });
        }, 
        onError: async (res) => {
            setFormSnackbar(setSnackbar, "", { error: true, status: res.status })
            setErrors(res?.errors)
        },
        onSettled: () => setCarregando(false)
    })

    return (
        <FormContainer
            id="nova-ordem"
            onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                defaultValue?.departamento_id && formData.append("departamento_id", defaultValue?.departamento_id)
                acao === 'editar'
                    ? editMutation.mutate(formData)
                    : addMutation.mutate(formData)
            }}
        >
            <TextField
                select
                label="Departamento"
                name="departamento_id"
                onChange={async (e) => { 
                    setDeptoSelecionado(e.target.value) 
                    setBaseSelecionada("")
                }}
                value={deptoSelecionado}
                error={errors?.hasOwnProperty('departamento_id')}
                helperText={errors?.departamento_id ?? " "}
                disabled={ !!defaultValue?.departamento_id || false }
                required
            >
                {Object.entries(departamentos).map(departamento => (
                    <MenuItem key={departamento[0]} value={departamento[0]}>
                        {departamento[1]}
                    </MenuItem>
                )) ??  <MenuItem value={99999999999}></MenuItem> 
                }
            </TextField>


            <ConditionalTooltip 
                enabled={!deptoSelecionado}
                texto={"Selecione um Departamento!"}
            >
                <CampoLocais
                    label="Base de origem dos materiais"
                    name="origem_id"
                    tipo="base"
                    depto={deptoSelecionado}
                    onChange={(e) => setBaseSelecionada(e.target.value)}
                    onLocaisQuery={(res) => setBaseSelecionada(prev => {
                        return prev === "" ? (res.length === 1 ? res[0].id : "") : prev
                    })}
                    value={baseSelecionada}
                    error={errors.hasOwnProperty('origem_id')}
                    helperText={errors.origem_id || ""}
                    disabled={!deptoSelecionado}
                    required
                />
            </ConditionalTooltip>

            <ConditionalTooltip 
                enabled={!deptoSelecionado}
                texto={"Selecione um Departamento!"}
            >
                <CampoLocais 
                    label="Local de Serviço"
                    name="local_servico_id"
                    tipo="parque"
                    depto={deptoSelecionado}
                    value={localServico}
                    onChange={ async e => {
                        setLocalServico(e.target.value)
                        //if(deptoSelecionado) {
                        //    const res = await getProfissionais(e.target.value, deptoSelecionado)
                        //    setProfissionaisDisponiveis(res.data)
                        //} 
                    }}
                    error={errors.hasOwnProperty('local_servico_id')}
                    helperText={errors.local_servico_id || ""}
                    disabled={!deptoSelecionado}
                    required
                />
            </ConditionalTooltip>

            <TextField 
                defaultValue={defaultValue?.especificacao}
                name="especificacao"
                label="Especificação"
                multiline
                minRows={4}
                error={errors.hasOwnProperty('especificacao')}
                helperText={errors.especificacao || ""}
                fullWidth
            />
        
            <TextField 
                defaultValue={defaultValue?.observacoes}
                name="observacoes"
                label="Serviços extras/obervações"
                multiline
                minRows={4}
                error={errors.hasOwnProperty('observacoes')}
                helperText={errors.observacoes || ""}
                fullWidth
            />
        
            <Box>
                {profissionais 
                && profissionais.length > 0 
                && location.pathname !== '/ordemservico/nova-ordem'
                &&
                    <Box className='my-10'>
                        <Typography sx={{
                            color: (theme) => theme.palette.color.bg,
                            fontSize: '1.3rem',
                            fontWeight: 'light',
                            mb: '0.5rem'
                        }}>
                            Profissionais
                        </Typography>
                        <Paper 
                            className="flex flex-col gap-4 px-4 py-5" 
                            sx={{ backgroundColor: (theme) => theme.palette.color.bgInterno }}
                            elevation={3}
                        >
                            {profissionais?.map(profissional => (
                                <Paper className="p-3" key={profissional.profissional_id}>
                                    <TituloTexto 
                                        titulo={profissional.profissional}
                                        texto={`${profissional.data_inicio_formatada} -  ${profissional.horas_empregadas}h`}
                                    />
                                </Paper>
                            ))}
                        </Paper>
                    </Box>
            }
            </Box>

                <MateriaisBox 
                    deptoSelecionado={deptoSelecionado} 
                    baseSelecionada={baseSelecionada} 
                    defaultValue={materiais} 
                    inputName='ordem_servico_items'
                />

                <BoxProfissionais
                    label= "Profissionais empregados"
                    name="ordem_servico_profissionais"
                    defaultValue={profissionais}
                />
        </FormContainer>
    );
}
    

export default FormOrdemServico;
