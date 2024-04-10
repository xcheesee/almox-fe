import { TextField, Box, MenuItem, Button, CircularProgress } from "@mui/material";
import ContainerPrincipal from "../../components/ContainerPrincipal";
import Titulo from "../../components/Titulo";
import { useState } from "react";
import DialogEnviar from "../../components/DialogEnviar";
import FormContainer from "../../components/FormContainer";
import { enviaNovaOcorrencia, getLocais } from "../../common/utils";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { snackbarAtom } from "../../atomStore";
import { useNavigate } from "react-router-dom";
import MateriaisBox from "../../components/MateriaisBox";
import CampoLocais from "../../components/CampoLocais";

export default function NovaOcorrencia () {

    const [snackbar, setSnackbar] = useAtom(snackbarAtom)

    const [tipoOcorrencia, setTipoOcorrencia] = useState("")
    const [openConfirmar, setOpenConfirmar] = useState(false)
    const [baseOrigem, setBaseOrigem] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    const locais = useQuery({
        queryKey: ['locais', "", "base"], 
        queryFn: () => getLocais("", "base"), 
        //enabled: !(depto === ''),
        onSuccess: (res) => {
            setBaseOrigem((res?.find(local => local.id === +localStorage.getItem("local")))?.id ?? "");
            //setBaseOrigem(res.length === 1 ? res[0].id : "")
        }
    })
    
    async function enviaOcorrenciaForm(e) {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData(e.target)
        try {
            await enviaNovaOcorrencia(formData)
            setSnackbar({...snackbar, open: true, message: "Ocorrencia enviada com sucesso!", severity: "success"})
            navigate("/ocorrencia")
        } catch(e){
            setErrors(e?.errors ?? {})
            setSnackbar({...snackbar, open: true, message: e?.text ?? `Ocorreu um erro: ${e.mensagem}`, severity: "error"})
        }
        setIsLoading(false)
    }

    return(
        <ContainerPrincipal>
            <Titulo voltaPara="/ocorrencia" >
                Nova Ocorrência
            </Titulo>

            <FormContainer 
                id="nova-ocorrencia"
                onSubmit={ async (e) => await enviaOcorrenciaForm(e) }
            >
                <TextField
                    type="date"
                    label="Data da Ocorrência"
                    name="data_ocorrencia"
                    id="data_ocorrencia"
                    error={errors.hasOwnProperty("data_ocorrencia")}
                    helperText={errors?.data_ocorrencia ?? ""}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required
                />

                <CampoLocais 
                    label="Base envolvida"
                    name="local_id"
                    tipo="base"
                    value={baseOrigem}
                    onChange={(e) => setBaseOrigem(e.target.value)}
                    error={errors.hasOwnProperty('local_servico_id')}
                    helperText={errors?.local_servico_id || ""}
                    restrito
                    getAll
                />

                <TextField
                    select
                    label="Tipo de Ocorrência"
                    name="tipo_ocorrencia"
                    id="tipo_ocorrencia"
                    value={tipoOcorrencia}
                    onChange={ (e) => setTipoOcorrencia(e.target.value) }
                    error={errors.hasOwnProperty("tipo_ocorrencia")}
                    helperText={errors?.tipo_ocorrencia ?? ""}
                    fullWidth
                    required
                >
                    <MenuItem value="avaria">Avaria</MenuItem>
                    <MenuItem value="furto">Furto</MenuItem>
                    <MenuItem value="extravio">Extravio</MenuItem>
                </TextField>

                <TextField
                    multiline
                    fullWidth
                    rows={4}
                    name="justificativa"
                    id="justificativa"
                    label="Justificativa"
                />

                {   
                    (tipoOcorrencia === "furto" || tipoOcorrencia === "extravio") && 
                    <TextField 
                        name="boletim_ocorrencia"
                        label="Boletim de Ocorrência"
                        type="file"
                        inputProps={{ accept: "image/*, application/pdf" }}
                        InputLabelProps={{ shrink: true }}
                        required={tipoOcorrencia === "furto" || tipoOcorrencia === "extravio"}
                        error={errors.hasOwnProperty('boletim_ocorrencia')}
                        helperText={errors?.boletim_ocorrencia || ""}
                        fullWidth
                    />
                }

                <MateriaisBox 
                    baseSelecionada={baseOrigem}
                    inputName='itens' 
                    entrada 
                    errors={errors}
                />
            </FormContainer>


            <Box className="flex gap justify-end items-center">
                { isLoading && <CircularProgress size={24}/> }
                <Button onClick={() => setOpenConfirmar(true)}>
                    Enviar
                </Button>
            </Box>

            <DialogEnviar 
                openConfirmar={openConfirmar}
                setOpenConfirmar={setOpenConfirmar}
                texto="ocorrência"
                form="nova-ocorrencia"
            />
        </ContainerPrincipal>
    )
}