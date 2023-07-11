import { MenuItem, TextField } from "@mui/material"

export default function FormEditSaida({ 
    defaultValue, 
    errors={}, 

}) {
    return(
        <>
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
                disabled
                defaultValue={defaultValue?.status ?? "a_iniciar"}
                error={errors.hasOwnProperty('status')}
                helperText={errors?.status || ""}
            >
                    <MenuItem value="A Iniciar">
                        A Iniciar
                    </MenuItem>
            </TextField>
    
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

            {/*<CampoLocais 
                label="Local de serviço"
                name="local_servico_id"
                tipo="parque"
                depto={deptoSelecionado}
                onChange={ async e => {
                    setLocalServico(e.target.value)
                    const res = await getProfissionais(e.target.value, deptoSelecionado)
                    if(deptoSelecionado) setProfissionaisDisponiveis(res.data) 
                }}
                defaultValue={defaultValue?.local_servico_id ?? ""}
                error={errors.hasOwnProperty('local_servico_id')}
                helperText={errors.local_servico_id || ""}
                //required
            />*/}

            <TextField 
                select
                label="Tipo de Serviço"
                name="tipo_servico"
                defaultValue={defaultValue?.tipo_servico ?? ""}
                id="tipo_servico"
            >
                <MenuItem value="civil">Civil</MenuItem>
                <MenuItem value="hidraulica">Hidráulica</MenuItem>
                <MenuItem value="eletrica">Elétrica</MenuItem>
                <MenuItem value="serralheria">Serralheria</MenuItem>
                <MenuItem value="carpintaria">Carpintaria</MenuItem>
            </TextField>
        
            <TextField 
                defaultValue={defaultValue?.especificacao ?? ""}
                name="especificacao"
                label="Especificação"
                multiline
                minRows={4}
                error={errors.hasOwnProperty('especificacao')}
                helperText={errors.especificacao || ""}
                fullWidth
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