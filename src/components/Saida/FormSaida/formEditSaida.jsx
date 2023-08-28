import { MenuItem, TextField } from "@mui/material"
import CampoTipoServicos from '../../CampoTipoServicos';
import BoxProfissionais from "../../BoxProfissionais";
import CampoLocais from "../../CampoLocais";
import OSAutocomplete from "../../OSAutocomplete";
import FormContainer from "../../FormContainer";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { profissionaisAtom, snackbarAtom } from "../../../atomStore";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { editaSaida } from "../../../common/utils";

export default function FormEditSaida({ 
    defaultValue, 
    formId,
    errors={}, 
    setCarregando,
    setOpen
}) {
    const query = useQueryClient()

    const profissionais = useAtomValue(profissionaisAtom)
    const setSnackbar = useSetAtom(snackbarAtom)

    const editSaidaMutation = useMutation({
        mutationFn: editaSaida,
        onSuccess: (res) => {
            query.invalidateQueries(['saidas']) 
            setSnackbar({
                open: true,
                severity: 'success',
                message: 'Edicao enviada com sucesso!'
            })
            setOpen(false)
        }

    })

    return(
        <>
            <FormContainer
                id={formId}
                onSubmit={(e) => {
                    e.preventDefault()

                    setCarregando(true)
                    const formData = new FormData(e.target)
                    formData.append('saida_profissionais', JSON.stringify(profissionais))
                    const id = defaultValue.id
                    editSaidaMutation.mutate({id, formData})
                    setCarregando(false)

                }}
            >
                <OSAutocomplete 
                    disabled={defaultValue?.ordem_servico_id}
                    defaultValue={defaultValue?.ordem_servico_id ?? ""}
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
            </FormContainer>
            <BoxProfissionais
                label={"Profissionais"}
                baseSelecionada={defaultValue.origem_id}
                deptoSelecionado={defaultValue.departamento_id}
                defaultValue={defaultValue.profissionais}
            />
        </>

    )
}