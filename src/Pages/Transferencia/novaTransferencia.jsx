import { TextField, Box, Button, CircularProgress } from "@mui/material";
import ContainerPrincipal from "../../components/ContainerPrincipal";
import Titulo from "../../components/Titulo";
import { useState } from "react";
import DialogEnviar from "../../components/DialogEnviar";
import FormContainer from "../../components/FormContainer";
import { enviaNovaTransferencia } from "../../common/utils";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { snackbarAtom } from "../../atomStore";
import MateriaisBox from "../../components/MateriaisBox";
import CampoLocais from "../../components/CampoLocais";

export default function NovaTransferencia () {

    const [snackbar, setSnackbar] = useAtom(snackbarAtom)

    const [openConfirmar, setOpenConfirmar] = useState(false)
    const [baseOrigem, setBaseOrigem] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    async function enviaTransferenciaForm(e) {
        e.preventDefault()
        setIsLoading(true)
        setErrors({})
        const formData = new FormData(e.target)
        try{
            await enviaNovaTransferencia(formData)
            setSnackbar({...snackbar, open: true, message: "Transferencia enviada com sucesso!", severity: "success"})
            navigate("/transferencia")
        } catch(e) {
            setErrors(e?.errors ?? "")
            setSnackbar({...snackbar, open: true, message: `Não foi possivel enviar a transferência: ${e?.mensagem}`, severity: "error"})
        }
        setIsLoading(false)
    }

    return(
        <ContainerPrincipal>
            <Titulo voltaPara="/transferencia" >
                Nova Transferência
            </Titulo>

            <FormContainer 
                id="nova-transferencia"
                onSubmit={ async (e) => await enviaTransferenciaForm(e) }
            >
                <TextField
                    type="date"
                    label="Data de Transferência"
                    name="data_transferencia"
                    error={errors.hasOwnProperty("data_transferencia")}
                    helperText = {errors?.data_transferencia ?? "" }
                    id="data_transferencia"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required
                />

                <CampoLocais 
                    label="Base de Origem"
                    name="base_origem_id"
                    tipo="base"
                    value={baseOrigem}
                    onChange={(e) => setBaseOrigem(e.target.value)}
                    error={errors.hasOwnProperty('base_origem_id')}
                    helperText={errors?.base_origem_id || ""}
                    restrito
                    getAll
                    required
                />

                <CampoLocais 
                    label="Base de Destino"
                    name="base_destino_id"
                    tipo="base"
                    error={errors.hasOwnProperty('base_destino_id')}
                    helperText={errors?.base_destino_id || ""}
                    getAll
                    required
                />

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
                texto="transferência"
                form="nova-transferencia"
            />
        </ContainerPrincipal>
    )
}