import React, { useEffect } from 'react';
import { 
    MenuItem,
    TextField,
} from '@mui/material';
import CampoLocais from '../../CampoLocais';
import CampoTipoServicos from '../../CampoTipoServicos';
import ConditionalTooltip from '../../ConditionalTooltip';

export default function FormSemOs ({
    baseSelecionada,
    setBaseSelecionada,
    deptoSelecionado,
    setDeptoSelecionado,
    errors={},
}) {
    const departamentos = JSON.parse(localStorage.getItem('departamentos'));
    const departamentoKeys = Object.keys(departamentos)

    useEffect(() => {
        if (departamentoKeys.length === 1) { setDeptoSelecionado(departamentoKeys[0]) }
    }, [])
    
    return(
            <>
            <TextField 
                multiline
                rows={4}
                name='justificativa_os'
                id='justificativa_os'
                label="Justificativa"
                error={errors.hasOwnProperty('justificativa_os')}
                helperText={errors?.justificativa_os ?? " "}
                required
            />
            {/* Campo Temporario, utilizado para testes */}
            <TextField
                select
                label="Departamento"
                name="departamento_id"
                onChange={async (e) => {
                    setDeptoSelecionado(e.target.value)
                }}
                value={deptoSelecionado ?? ""}
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
                defaultValue="A Iniciar"
                error={errors.hasOwnProperty('status')}
                helperText={errors?.status || " "}
            >
                    <MenuItem value="A Iniciar">
                        A Iniciar
                    </MenuItem>
            </TextField>
            <ConditionalTooltip enabled={!deptoSelecionado} texto="Selecione um departamento!">
            <CampoLocais
                label="Base de origem dos materiais"
                name="origem_id"
                tipo="base"
                depto={deptoSelecionado}
                onChange={(e) => setBaseSelecionada(e.target.value)}
                onLocaisQuery={(res) => setBaseSelecionada(prev => {
                    return prev === "" ? (res.length === 1 ? res[0].id : "") : prev
                })}
                value={baseSelecionada ?? ""}
                error={errors.hasOwnProperty('origem_id')}
                helperText={errors?.origem_id ?? " "}
                disabled={!deptoSelecionado}
                restrito
                required
            />
            </ConditionalTooltip>

            <ConditionalTooltip enabled={!deptoSelecionado} texto="Selecione um departamento!">
                <CampoLocais 
                    label="Local de serviço"
                    name="local_servico_id"
                    tipo="parque"
                    depto={deptoSelecionado}
                    error={errors.hasOwnProperty('local_servico_id')}
                    helperText={errors?.local_servico_id || " "}
                    disabled={!deptoSelecionado}
                    required
                />
            </ConditionalTooltip>

            <CampoTipoServicos 
                label="Tipo de Serviço"
                name="tipo_servico_id"
                id="tipo_servico_id"
                deptoSelecionado={deptoSelecionado}
                error={errors.hasOwnProperty('tipo_servico_id')}
                helperText={errors?.tipo_servico_id || " "}
            />
        
            <TextField 
                name="especificacao"
                label="Especificação"
                multiline
                minRows={4}
                error={errors.hasOwnProperty('especificacao')}
                helperText={errors?.especificacao || " "}
                fullWidth
            />
        
            <TextField 
                name="observacoes"
                label="Serviços extras/obervações"
                multiline
                minRows={4}
                error={errors.hasOwnProperty('observacoes')}
                helperText={errors?.observacoes || " "}
                fullWidth
            />
        </>
    )
}