import React, { useEffect, useState } from 'react';
import { 
    MenuItem,
    TextField,
    Box,
    Typography, 
    Paper,
    Switch,
    FormGroup,
    FormControlLabel
} from '@mui/material';
import FormContainer from '../../FormContainer';
import Selecao from '../../Selecao';
import CampoLocais from '../../CampoLocais';
import BoxMateriais from '../../BoxMateriais';
import BoxProfissionais from '../../BoxProfissionais';
import { enviaEdicao, enviaNovoForm, getProfissionais, getStatusEnum, setFormSnackbar } from '../../../common/utils';
import { deptoAtom, matTipoListAtom, snackbarAtom } from '../../../atomStore';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import TituloTexto from '../../TituloTexto';
import { useLocation } from 'react-router-dom';
import OSAutocomplete from '../../OSAutocomplete';

const FormSaida = (props) => {
    const queryClient = useQueryClient()
    const location = useLocation();

    const { 
        defaultValue, 
        setCarregando, 
        setOpenEditar, 
        setOpenConfirmar, 
        navigate, 
        acao, 
        materiais,
        profissionais,
        errors,
        setErrors,
        baseSelecionada,
        setBaseSelecionada,
    } = props;

    const statusEnum = useQuery(['statusEnum'], getStatusEnum)

    const [localServico, setLocalServico] = useState()
    const [status, setStatus] = useState(defaultValue?.status ?? "A iniciar")
    const [profissionaisDisponiveis, setProfissionaisDisponiveis] = useState('')
    const [profissionaisEmpregados, setProfissionaisEmpregados] = useState([{
        nome: '',
        id: '',
        ["data_inicio"]: '',
        ["horas_empregadas"]: '',
    }])
    const [isNoOSForm, setIsNoOSForm] = useState(false);
    const [ordemServico, setOrdemServico] = useState()
    
    const [deptoSelecionado, setDeptoSelecionado] = useAtom(deptoAtom)
    const setSnackbar = useSetAtom(snackbarAtom)
    const materiaisInterno = useAtomValue(matTipoListAtom)

    const departamentos = JSON.parse(localStorage.getItem('departamentos'));
    const departamentoKeys = Object.keys(departamentos)
    
    useEffect(() => {
        setDeptoSelecionado('')//reseta o atom toda vez que o componente eh renderizado pela primeira vez
        if(acao === 'editar') {
            setDeptoSelecionado(defaultValue?.departamento_id)
        } else if (departamentoKeys.length === 1) {
            setDeptoSelecionado(departamentoKeys[0])
        }
    }, [])

    const editMutation = useMutation( async (data) => {
        setOpenConfirmar(false)
        setCarregando(true)
        return await enviaEdicao(
            data,
            'ordem_servico', 
            defaultValue.id, 
            materiaisInterno,
            'ordem_servico_items'
        )
    },
    {
        onSuccess: async (res) => {
            setOpenEditar(false)
            setCarregando(false)
            queryClient.invalidateQueries(['ordemItens'])
            setFormSnackbar(setSnackbar, "Ordem de serviço", { edit: true })
        },
        onError: async (res) => {
            setCarregando(false)
            if(res.status === 422) { /* setErrors(res?.errors) */ }
            setFormSnackbar(setSnackbar, "", { error: true , status: res.status, edit: true })
        }
    })

    const addMutation = useMutation( async (data) => {
        setOpenConfirmar(false)
        setCarregando(true)
        return await enviaNovoForm(
            data, 
            'ordem_servico', 
            materiaisInterno,
            'ordem_servico_items',
            profissionaisEmpregados,
            "ordem_servico_profissionais"
        )
    }, { onSuccess: async (res) => {
            setCarregando(false)
            queryClient.invalidateQueries(['ordemItens'])
            setFormSnackbar(setSnackbar, "Ordem de serviço")
            navigate(`/ordemservico`, { replace: true });
        }, onError: async (res) => {
            setCarregando(false)
            if(res.status === 422) { setErrors(res?.errors) }
            setFormSnackbar(setSnackbar, "", { error: true, status: res.status })
        }
    })

    return (
        <>
            <Box className='flex flex-col pt-8'>
                <OSAutocomplete 
                    disabled={isNoOSForm}
                    ordemServico={ordemServico}
                    setOrdemServico={setOrdemServico}
                />
                {/*<TextField
                    select
                    name='numero_ordem_servico'
                    id="numbero_ordem_servico"
                    label="Nro Ordem de Servico"
                    defaultValue=""
                    disabled={isNoOSForm}
                    required={!isNoOSForm}
                    fullWidth
                >
                    <MenuItem value={'teste'}>Teste</MenuItem>
                </TextField>*/}

                <Box className='flex'>
                    <FormGroup>
                        <FormControlLabel  
                            control={
                                <Switch 
                                    checked={isNoOSForm} 
                                    onChange={() => setIsNoOSForm(prev => !prev)}
                                />
                            } 
                            label="Saida sem O.S." 
                        />
                    </FormGroup>
                </Box>
            </Box>
            {isNoOSForm
                ?<>
                    <FormContainer
                        id="nova-ordem"
                        onSubmit={(e) => {
                            acao === 'editar'
                                ? editMutation.mutate(e)
                                : addMutation.mutate(e)
                        }}
                    >

                        <TextField 
                            multiline
                            rows={4}
                            name='justificativa_os'
                            id='justificativa_os'
                            label="Justificativa"
                            required
                        />
                        {/*<Selecao
                            label="Departamento"
                            name="departamento_id"
                            onChange={async (e) => {
                                setDeptoSelecionado(e.target.value)
                                if(localServico) setProfissionaisDisponiveis(await getProfissionais(localServico, e.target.value)) 
                            }}
                            defaultValue={departamentoKeys.length === 1 ? departamentoKeys[0] : "" || defaultValue?.departamento_id}
                            error={errors.hasOwnProperty('departamento_id')}
                            helperText={errors.departamento_id || ""}
                            required
                        >
                            {Object.entries(departamentos).map(departamento => (
                                <MenuItem key={departamento[0]} value={departamento[0]}>
                                    {departamento[1]}
                                </MenuItem>
                            ))}
                        </Selecao>*/}

                        <Selecao
                            label="Status"
                            name="status"
                            onChange={(e) => setStatus(e.target.value)}
                            value={ status }
                            // defaultValue={defaultValue?.status}
                            error={errors.hasOwnProperty('status')}
                            helperText={errors.status || ""}
                            disabled
                            required
                        >
                            {statusEnum?.data?.map((status, index) => (
                                <MenuItem key={`status${index}`} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                        </Selecao>
    
                        {/*<TextField 
                            defaultValue={defaultValue?.data_inicio_servico}
                            type="datetime-local"
                            name="data_inicio_servico"
                            label="Data de início do serviço"
                            InputLabelProps={{ shrink: true }}
                            error={errors.hasOwnProperty('data_inicio_servico')}
                            helperText={errors.data_inicio_servico || ""}
                            required
                            fullWidth
                        />
        
                        <TextField 
                            defaultValue={defaultValue?.data_fim_servico}
                            type="datetime-local"
                            name="data_fim_servico"
                            label="Data de fim do serviço"
                            InputLabelProps={{ shrink: true }}
                            error={errors.hasOwnProperty('data_fim_servico')}
                            helperText={errors.data_fim_servico || ""}
                            fullWidth
                        />*/}

                        <CampoLocais
                            label="Base de origem dos materiais"
                            name="origem_id"
                            tipo="base"
                            depto={deptoSelecionado}
                            onChange={(e) => setBaseSelecionada(e.target.value)}
                            defaultValue={defaultValue?.origem_id}
                            error={errors.hasOwnProperty('origem_id')}
                            helperText={errors.origem_id || ""}
                            required
                        />

                        <CampoLocais 
                            label="Local de serviço"
                            name="local_servico_id"
                            tipo="parque"
                            depto={deptoSelecionado}
                            onChange={ async e => {
                                setLocalServico(e.target.value)
                                if(deptoSelecionado) setProfissionaisDisponiveis(await getProfissionais(e.target.value, deptoSelecionado)) 
                            }}
                            defaultValue={defaultValue?.local_servico_id}
                            error={errors.hasOwnProperty('local_servico_id')}
                            helperText={errors.local_servico_id || ""}
                            required
                        />

                        <TextField 
                            select
                            label="Tipo de Serviço"
                            name="tipo_servico"
                            id="tipo_servico"
                        >
                            <MenuItem value="civil">Civil</MenuItem>
                            <MenuItem value="hidraulica">Hidráulica</MenuItem>
                            <MenuItem value="eletrica">Elétrica</MenuItem>
                            <MenuItem value="serralheria">Serralheria</MenuItem>
                            <MenuItem value="carpintaria">Carpintaria</MenuItem>
                        </TextField>
        
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
                            {/*<Typography 
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
                                    error={errors.hasOwnProperty('almoxarife_nome')}
                                    helperText={errors.almoxarife_nome || ""}
                                    required
                                    fullWidth
                                />
        
                                <TextField 
                                    defaultValue={defaultValue?.almoxarife_email}
                                    name="almoxarife_email"
                                    label="E-mail"
                                    type="email"
                                    error={errors.hasOwnProperty('almoxarife_email')}
                                    helperText={errors.almoxarife_email || ""}
                                    required
                                    fullWidth
                                />
                            </Box>*/}
                            {profissionais && profissionais.length > 0 && location.pathname !== '/saida/nova-saida'
                                ?<Box className='my-10'>
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
                                :""
                            }
                            {materiais && materiais.length > 0 && location.pathname !== '/saida/nova-saida'
                                ?<>
                                    <Typography sx={{
                                        color: (theme) => theme.palette.color.bg,
                                        fontSize: '1.3rem',
                                        fontWeight: 'light',
                                        mb: '0.5rem'
                                    }}>
                                        Materiais
                                    </Typography>
                                    <Paper 
                                        className="flex flex-col gap-4 px-4 py-5" 
                                        sx={{ backgroundColor: (theme) => theme.palette.color.bgInterno }}
                                        elevation={3}
                                    >
                                        {materiais.map(material => (
                                            <Paper className="p-3" key={material.id}>
                                                <TituloTexto 
                                                    titulo={material.item}
                                                    texto={`${material.quantidade} ${material.medida}`}
                                                />
                                            </Paper>
                                        ))}
                                    </Paper>
                                </>
                                :""
                            }
                        </Box>
                    </FormContainer>
        
                    <>
                        {acao === 'editar'
                            ?""
                            :<>
                               <BoxProfissionais
                                   label= "Profissionais empregados"
                                   // baseSelecionada={baseSelecionada}
                                   // deptoSelecionado={deptoSelecionado}
                                   profissionaisDisponiveis={profissionaisDisponiveis}
                                   profissionaisEmpregados={profissionaisEmpregados}
                                   setProfissionaisEmpregados={setProfissionaisEmpregados}
                               />

                               <BoxMateriais
                                   label="Material utilizado"
                                   baseSelecionada={baseSelecionada}
                                   deptoSelecionado={deptoSelecionado}
                               />
                            </>
                        }
                    </>
                </>
                :<></>
            }
        </>
    );
}
    

export default FormSaida;
