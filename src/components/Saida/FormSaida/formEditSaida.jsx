import { MenuItem, TextField } from "@mui/material"
import CampoTipoServicos from '../../CampoTipoServicos';
import BoxProfissionais from "../../BoxProfissionais";
import CampoLocais from "../../CampoLocais";
import OSAutocomplete from "../../OSAutocomplete";

export default function FormEditSaida({ 
    defaultValue, 
    errors={}, 
}) {

    return(
        <>
            <OSAutocomplete 
                disabled={defaultValue?.ordem_servico_id}
                defaultValue={defaultValue?.ordem_servico_id ?? ""}
                //setOrdemServico={setOrdemFromOptions}
                //clearForm={clearForm}
            />

            <TextField 
                multiline
                rows={4}
                name='justificativa_os'
                id='justificativa_os'
                label="Justificativa"
                defaultValue={defaultValue?.justificativa_os ?? ""}
                //required
            />
            {/* Campo Temporario, utilizado para testes */}
            {/*<TextField
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
            </TextField>*/}

            <TextField
                select
                label="Status"
                name="status"
                defaultValue={defaultValue?.status ?? "A iniciar"}
                error={errors.hasOwnProperty('status')}
                helperText={errors?.status || ""}
            >
                <MenuItem key="A iniciar" value="A iniciar">
                    A Iniciar
                </MenuItem>
                <MenuItem key="Iniciada" value="Iniciada">
                    Iniciada
                </MenuItem>
                <MenuItem key="Finalizada" value="Finalizada">
                    Finalizada
                </MenuItem>
            </TextField>

            <BoxProfissionais
                baseSelecionada={defaultValue.origem_id}
                deptoSelecionado={defaultValue.departamento_id}
                defaultValue={defaultValue.profissionais}
            />
    
            {/*<CampoLocais
                label="Base de origem dos materiais"
                name="origem_id"
                tipo="base"
                depto={deptoSelecionado}
                onChange={(e) => setBaseSelecionada(e.target.value)}
                defaultValue={defaultValue?.origem_id ?? ""}
                error={errors.hasOwnProperty('origem_id')}
                helperText={errors?.origem_id ?? ""}
                //required
            />*/}

            <CampoLocais 
                label="Local de serviço"
                name="local_servico_id"
                tipo="parque"
                depto={defaultValue.departamento_id}
                //onChange={ async e => {
                //    setLocalServico(e.target.value)
                //    const res = await getProfissionais(e.target.value, deptoSelecionado)
                //    if(deptoSelecionado) setProfissionaisDisponiveis(res.data) 
                //}}
                defaultValue={defaultValue?.local_servico_id ?? ""}
                error={errors.hasOwnProperty('local_servico_id')}
                helperText={errors.local_servico_id || ""}
                //required
            />

            <CampoTipoServicos 
                label="Tipo de Serviço"
                name="tipo_servico_id"
                id="tipo_servico_id"
                deptoSelecionado={defaultValue?.departamento_id}
                defaultValue={defaultValue?.tipo_servico_id}
                error={errors.hasOwnProperty('local_servico_id')}
                helperText={errors.tipo_servico_id || ""}
            />
        
            <TextField 
                multiline
                rows={4}
                name="especificacao"
                id="especificacao"
                label="Especificação"
                defaultValue={defaultValue?.especificacao ?? ""}
                error={errors.hasOwnProperty('especificacao')}
                helperText={errors.especificacao || ""}
            />
        
            <TextField 
                defaultValue={defaultValue?.observacoes ?? ""}
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