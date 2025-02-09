import { MenuItem, TextField, Box, Button, CircularProgress } from "@mui/material";
import ContainerPrincipal from "../../components/ContainerPrincipal";
import Titulo from "../../components/Titulo";
import FormContainer from "../../components/FormContainer";
import { useState } from "react";
import DialogEnviar from "../../components/DialogEnviar";
import { useNavigate, useParams } from "react-router-dom";
import { recusaTransferencia } from "../../common/utils";
import { useSetAtom } from "jotai";
import { snackbarAtom } from "../../atomStore";
import { useQueryClient } from "@tanstack/react-query";

export default function RecusaTranferencia() {
    const setSnackbar = useSetAtom(snackbarAtom)
    const queryClient = useQueryClient()

    const navigate = useNavigate()
    const [openConfirmar, setOpenConfirmar] = useState(false)
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    const params = useParams();

    async function enviaRecusaForm(e) {
        e.preventDefault()
        setIsLoading(true)
        //const transferData = await getRegistro("transferencia", params.id)
        //const formData = new FormData(e.target)

        //formData.append("base_origem_id", transferData.data.base_origem_id)
        //formData.append("base_destino_id", transferData.data.base_destino_id)
        //formData.append("data_transferencia", transferData.data.data_transferencia)

        try {
            await recusaTransferencia(params.id)
            setSnackbar({
                message: "Transferencia recusada com sucesso!",
                severity: "success",
                open: true,
            })
            await queryClient.invalidateQueries(['transferencias'])
            navigate("/transferencia")
        } catch(e) {
            setSnackbar({
                message: e?.message ?? "Nao foi possivel enviar a solicitacao!",
                severity: "error",
                open: true,
            })
        }
        setIsLoading(false)
    }

    return(
        <ContainerPrincipal>
            <Titulo voltaPara="/transferencia" >
                Recusa de Transferência N# {params.id}
            </Titulo>

            <FormContainer 
                id="recusa-transferencia"
                onSubmit={async (e) => {
                    try {
                        await enviaRecusaForm(e)
                    } catch(e) {
                        setErrors(e.errors ?? {})
                    }
                }}
            >
                <TextField 
                    select
                    label="Motivo da Recusa"
                    name="observacao_motivo"
                    id="observacao_motivo"
                    error={errors.hasOwnProperty("observacao_motivo")}
                    helperText={errors?.observacao_motivo ?? " "}
                    //SelectProps={{ defaultValue: ""}}
                    defaultValue=""
                    required
                >
                    <MenuItem value="nao_enviado">Não Enviado</MenuItem>
                    <MenuItem value="itens_faltando">Itens Faltando</MenuItem>
                    <MenuItem value="extravio">Extravio</MenuItem>
                    <MenuItem value="furto">Furto</MenuItem>
                    <MenuItem value="avaria">Avaria</MenuItem>
                </TextField>

                <TextField
                    multiline
                    label="Justificativa"
                    rows={4}
                    name="observacao"
                    error={errors.hasOwnProperty("observacao")}
                    helperText={ errors?.observacao ?? " " }
                    id="observacao"
                />
            </FormContainer>
            <Box className="flex gap-2 justify-end items-center">
                { isLoading && <CircularProgress size={24} /> }
                <Button onClick={() => setOpenConfirmar(true)}>Enviar</Button>
            </Box>

            <DialogEnviar 
                openConfirmar={openConfirmar}
                setOpenConfirmar={setOpenConfirmar}
                texto="recusa de transferência"
                form="recusa-transferencia"
            />
        </ContainerPrincipal>
    )
}