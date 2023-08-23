import React, { useEffect, useState } from 'react';
import { 
    MenuItem,
    TextField,
} from '@mui/material';
import CampoLocais from '../../CampoLocais';
import CampoTipoServicos from '../../CampoTipoServicos';
import { getProfissionais } from '../../../common/utils';
import { deptoAtom, tipoServicoAtom } from '../../../atomStore';
import { useAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import TipoServicoInput from '../../tipoServicoInput';

export default function FormSemOs ({
    setBaseSelecionada,
    setProfissionaisDisponiveis,
    errors={},
    setErrors
}) {

    const [localServico, setLocalServico] = useState()
    const [deptoSelecionado, setDeptoSelecionado] = useAtom(deptoAtom)
    const [tipoServicoSelecionado, setTipoServicoSelecionado] = useAtom(tipoServicoAtom)

    const departamentos = JSON.parse(localStorage.getItem('departamentos'));
    const departamentoKeys = Object.keys(departamentos)

    useEffect(() => {
        setDeptoSelecionado('')//reseta o atom toda vez que o componente eh renderizado pela primeira vez
        if (departamentoKeys.length === 1) {
            setDeptoSelecionado(departamentoKeys[0])
        }
        setTipoServicoSelecionado('')
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
            <TextField
                select
                label="Departamento"
                name="departamento_id"
                onChange={async (e) => {
                    setDeptoSelecionado(e.target.value)
                    const res = await getProfissionais(localServico, e.target.value)
                    if(localServico) setProfissionaisDisponiveis(res.data) 
                }}
                value={deptoSelecionado ?? ""}
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
            </TextField>

            <TextField
                select
                label="Status"
                name="status"
                disabled
                defaultValue="a_iniciar"
                error={errors.hasOwnProperty('status')}
                helperText={errors?.status || ""}
            >
                    <MenuItem value="a_iniciar">
                        A Iniciar
                    </MenuItem>
            </TextField>
    
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

            <CampoTipoServicos 
                label="Tipo de Serviço"
                name="tipo_servico"
                tipo_servico=""
                onChange={ async e => {
                    setTipoServicoSelecionado(e.target.value)
                }}
                value={tipoServicoSelecionado ?? ""}
                //defaultValue={tipoServicoSelecionado ?? ""}
                error={errors.hasOwnProperty('tipo_servico_id')}
                helperText={errors.tipo_servico_id || ""}
                //required
            />
        
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