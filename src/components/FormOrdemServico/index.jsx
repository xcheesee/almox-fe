import React, { useEffect, useState } from 'react';
import { 
    MenuItem,
    TextField,
    Box,
    Typography, 
    Paper
} from '@mui/material';
import FormContainer from '../FormContainer';
import Selecao from '../Selecao';
import CampoLocais from '../CampoLocais';
import BoxMateriais from '../BoxMateriais';
import BoxProfissionais from '../BoxProfissionais';
import style from './style';
import { enviaEdicao, enviaNovoForm, getStatusEnum, setFormSnackbar } from '../../common/utils';
import { snackbarAtom } from '../../atomStore';
import { useSetAtom } from 'jotai';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import TituloTexto from '../TituloTexto';
import { useLocation } from 'react-router-dom';

const FormOrdemServico = (props) => {
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
        // setHouveMudanca, 
        errors,
        setErrors,
        baseSelecionada,
        setBaseSelecionada,
        deptoSelecionado,
        setDeptoSelecionado
    } = props;

    const statusEnum = useQuery(['statusEnum'], getStatusEnum)

    const [materiaisInterno, setMateriaisInterno] = useState(materiais);
    const [status, setStatus] = useState('')
    const [profissionaisEmpregados, setProfissionaisEmpregados] = useState([{
        nome: '',
        dataInicio: '',
        horasEmpregadas: '',
    }])
    const setSnackbar = useSetAtom(snackbarAtom)
    const departamentos = JSON.parse(localStorage.getItem('departamentos'));
    
    useEffect(() => setMateriaisInterno(materiais), [materiais]);

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
    }, { onSuccess: async (res) => {
            setOpenEditar(false)
            setCarregando(false)
            queryClient.invalidateQueries(['ordemItens'])
            setFormSnackbar(setSnackbar, "Ordem de serviço", { edit: true })
        }, onError: async (res) => {
            setCarregando(false)
            if(res.status === 422) { /* setErrors(res?.errors) */ }
            setFormSnackbar(setSnackbar, "", { error: true , status: res.status, edit: true })
    }})

    const addMutation = useMutation( async (data) => {
        setOpenConfirmar(false)
        setCarregando(true)
        return await enviaNovoForm(
            data, 
            'ordem_servico', 
            materiaisInterno,
            'ordem_servico_items'
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
        <FormContainer
            id="nova-ordem"
            onSubmit={(e) => {
                acao === 'editar'
                    ? editMutation.mutate(e)
                    : addMutation.mutate(e)
            }}
        >
            <Selecao
                label="Departamento"
                name="departamento_id"
                onChange={(e) => setDeptoSelecionado(e.target.value)}
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

            <Selecao
                label="Status"
                name="status"
                onChange={(e) => setStatus(e.target.value)}
                value={status !== '' ? status : defaultValue?.status || ""}
                // defaultValue={defaultValue?.status}
                error={errors.hasOwnProperty('status')}
                helperText={errors.status || ""}
                required
            >
                {statusEnum?.data?.map((status, index) => (
                    <MenuItem key={`status${index}`} value={status}>
                        {status}
                    </MenuItem>
                ))}
            </Selecao>
    
            <TextField 
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
            />

            <CampoLocais
                label="Base de origem dos materiais"
                name="origem_id"
                onChange={(e) => setBaseSelecionada(e.target.value)}
                defaultValue={defaultValue?.origem_id}
                error={errors.hasOwnProperty('origem_id')}
                helperText={errors.origem_id || ""}
                required
            />

            <CampoLocais 
                label="Local de serviço"
                name="local_servico_id"
                defaultValue={defaultValue?.local_servico_id}
                error={errors.hasOwnProperty('local_servico_id')}
                helperText={errors.local_servico_id || ""}
                required
            />
        
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
                </Box>
                {materiais && materiais.length > 0 && location.pathname !== '/ordemservico/nova-ordem'
                ?
                    <>
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
                :
                    ""
            }

            </Box>
        </FormContainer>
        
        {acao === 'editar'
        ?
            ""
        :
            <>
                <BoxProfissionais
                    label= "Profissionais empregados"
                    baseSelecionada={baseSelecionada}
                    deptoSelecionado={deptoSelecionado}
                    profissionaisEmpregados={profissionaisEmpregados}
                    setProfissionaisEmpregados={setProfissionaisEmpregados}
                />

                <BoxMateriais
                    label="Material utilizado"
                    materiais={materiaisInterno}
                    setMateriais={setMateriaisInterno}
                    baseSelecionada={baseSelecionada}
                    deptoSelecionado={deptoSelecionado}
                />
            </>
        }
        </>
    );
}
    

export default FormOrdemServico;