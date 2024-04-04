import { Box, MenuItem, TextField } from "@mui/material"
import CampoTipoServicos from '../../CampoTipoServicos';
import BoxProfissionais from "../../BoxProfissionais";
import CampoLocais from "../../CampoLocais";
import OSAutocomplete from "../../OSAutocomplete";
import FormContainer from "../../FormContainer";
import { useSetAtom } from "jotai";
import { snackbarAtom } from "../../../atomStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editaSaida } from "../../../common/utils";
import MateriaisBox from "../../MateriaisBox";
import { useState } from "react";

export default function FormEditSaida({ 
    defaultValue, 
    formId,
    setCarregando,
    setOpen
}) {
    const query = useQueryClient()

    //const profissionais = useAtomValue(profissionaisAtom)
    const setSnackbar = useSetAtom(snackbarAtom)

    const [errors, setErrors] = useState({})

    const editSaidaMutation = useMutation({
        mutationFn: editaSaida,
        onMutate: () => setCarregando(true),
        onSuccess: () => {
            query.invalidateQueries(['saidas']) 
            setSnackbar({
                open: true,
                severity: 'success',
                message: 'Edicao enviada com sucesso!'
            })
            setOpen(false)
        }, 
        onError: (err) => {
            setSnackbar({
                open: true,
                severity: 'error',
                message: `${err?.errors}`
            })
            setErrors(err?.errros)
        },
        onSettled: () => setCarregando(false)
    })

    return(
            <FormContainer
                id={formId}
                onSubmit={(e) => {
                    e.preventDefault()

                    const autoComplete = document.getElementById('ordem_servico')

                    const formData = new FormData(e.target)
                    if(autoComplete.disabled){
                        formData.append('ordem_servico_id', defaultValue.ordem_servico_id)
                    }
                    const id = defaultValue.id
                    editSaidaMutation.mutate({id, formData})
                }}
            >
                {!defaultValue.ordem_servico_id && <Box className="font-thin text-red-500">Sem O.S</Box>}
                <OSAutocomplete 
                    disabled={ !!defaultValue?.ordem_servico_id }
                    defaultValue={defaultValue?.ordem_servico_id ?? ""}
                />

                {!defaultValue.ordem_servico_id && 
                    <TextField 
                        multiline
                        rows={4}
                        name='justificativa_os'
                        id='justificativa_os'
                        label="Justificativa"
                        defaultValue={defaultValue?.justificativa_os ?? ""}
                        required
                    />
                }

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
                    depto={defaultValue?.departamento_id}
                    defaultValue={defaultValue?.local_servico_id ?? ""}
                    error={errors.hasOwnProperty('local_servico_id')}
                    helperText={errors?.local_servico_id ?? ""}
                    required
                />

                <CampoTipoServicos 
                    label="Tipo de Serviço"
                    name="tipo_servico_id"
                    id="tipo_servico_id"
                    deptoSelecionado={defaultValue?.departamento_id}
                    defaultValue={defaultValue?.tipo_servico_id ?? ""}
                    error={errors.hasOwnProperty('local_servico_id')}
                    helperText={errors?.tipo_servico_id || ""}
                />
        
                <TextField 
                    multiline
                    rows={4}
                    name="especificacao"
                    id="especificacao"
                    label="Especificação"
                    defaultValue={defaultValue?.especificacao ?? ""}
                    error={errors.hasOwnProperty('especificacao')}
                    helperText={errors?.especificacao || ""}
                />
        
                <TextField 
                    defaultValue={defaultValue?.observacoes ?? ""}
                    name="observacoes"
                    label="Serviços extras/obervações"
                    multiline
                    minRows={4}
                    error={errors.hasOwnProperty('observacoes')}
                    helperText={errors?.observacoes || ""}
                    fullWidth
                />

                <MateriaisBox 
                    deptoSelecionado={defaultValue.departamento_id} 
                    baseSelecionada={defaultValue.origem_id}
                    defaultValue={defaultValue.materiais} 
                    inputName="saida_items" 
                />

                <BoxProfissionais
                    label={"Profissionais"}
                    baseSelecionada={defaultValue.origem_id}
                    deptoSelecionado={defaultValue.departamento_id}
                    defaultValue={defaultValue?.profissionais ?? ""}
                    name="saida_profissionais"
                />
            </FormContainer>
    )
}