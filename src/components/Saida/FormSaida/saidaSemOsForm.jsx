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
import { useLocation, useNavigate } from 'react-router-dom';
import OSAutocomplete from '../../OSAutocomplete';
import SaidaOSCard from '../../SaidaOSCard';
//import SaidaSemOsForm from './saidaSemOsForm';

export default function SaidaSemOsForm ({
    setOpenConfirmar,
    setCarregando,
    baseSelecionada,
    setBaseSelecionada,
    setProfissionaisDisponiveis,
    errors={},
    setErrors
}) {
    const navigate = useNavigate()
    const location = useLocation();
    const queryClient = useQueryClient()

    const [localServico, setLocalServico] = useState()
    const [deptoSelecionado, setDeptoSelecionado] = useAtom(deptoAtom)
    const setSnackbar = useSetAtom(snackbarAtom)

    const [profissionaisEmpregados, setProfissionaisEmpregados] = useState([{
        nome: '',
        id: '',
        ["data_inicio"]: '',
        ["horas_empregadas"]: '',
    }])

    const departamentos = JSON.parse(localStorage.getItem('departamentos'));
    const departamentoKeys = Object.keys(departamentos)

    useEffect(() => {
        setDeptoSelecionado('')//reseta o atom toda vez que o componente eh renderizado pela primeira vez
        /*if(acao === 'editar') {
            setDeptoSelecionado(defaultValue?.departamento_id)
        } else*/ if (departamentoKeys.length === 1) {
            setDeptoSelecionado(departamentoKeys[0])
        }
    }, [])


    return(
            <>
            <TextField 
                multiline
                rows={4}
                name='justificativa_os'
                id='justificativa_os'
                label="Justificativa"
                //required
            />
            {/* Campo Temporario, utilizado para testes */}
            <Selecao
                label="Departamento"
                name="departamento_id"
                onChange={async (e) => {
                    setDeptoSelecionado(e.target.value)
                    const res = await getProfissionais(localServico, e.target.value)
                    if(localServico) setProfissionaisDisponiveis(res.data) 
                }}
                value={deptoSelecionado}
                //defaultValue={departamentoKeys.length === 1 ? departamentoKeys[0] : "" || defaultValue?.departamento_id}
                error={errors.hasOwnProperty('departamento_id')}
                helperText={errors?.departamento_id ?? ""}
                //required
            >
                {Object.entries(departamentos).map(departamento => (
                    <MenuItem key={departamento[0]} value={departamento[0]}>
                        {departamento[1]}
                    </MenuItem>
                ))}
            </Selecao>

            <TextField
                select
                label="Status"
                name="status"
                disabled
                value={"a_iniciar"}
                //onChange={(e) => setStatus(e.target.value)}
                //value={ status }
                // defaultValue={defaultValue?.status}
                error={errors.hasOwnProperty('status')}
                helperText={errors?.status || ""}
                //required
            >
                    <MenuItem value="a_iniciar">
                        A Iniciar
                    </MenuItem>
            </TextField>
    
            {/*<TextField 
                defaultValue={defaultValue?.data_inicio_servico}
                type="datetime-local"
                name="data_inicio_servico"
                label="Data de início do serviço"
                InputLabelProps={{ shrink: true }}
                error={errors.hasOwnProperty('data_inicio_servico')}
                helperText={errors.data_inicio_servico || ""}
                //required
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
                //defaultValue={defaultValue?.origem_id}
                error={errors.hasOwnProperty('origem_id')}
                helperText={errors?.origem_id ?? ""}
                //required
            />

            <CampoLocais 
                label="Local de serviço"
                name="local_servico_id"
                tipo="parque"
                depto={deptoSelecionado}
                onChange={ async e => {
                    setLocalServico(e.target.value)
                    const res = await getProfissionais(e.target.value, deptoSelecionado)
                    if(deptoSelecionado) setProfissionaisDisponiveis(res.data) 
                }}
                //defaultValue={defaultValue?.local_servico_id}
                error={errors.hasOwnProperty('local_servico_id')}
                helperText={errors.local_servico_id || ""}
                //required
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
                //defaultValue={defaultValue?.especificacao}
                name="especificacao"
                label="Especificação"
                multiline
                minRows={4}
                error={errors.hasOwnProperty('especificacao')}
                helperText={errors.especificacao || ""}
                fullWidth
            />
        
            <TextField 
                //defaultValue={defaultValue?.observacoes}
                name="observacoes"
                label="Serviços extras/obervações"
                multiline
                minRows={4}
                error={errors.hasOwnProperty('observacoes')}
                helperText={errors.observacoes || ""}
                fullWidth
            />
        </>
    )
}