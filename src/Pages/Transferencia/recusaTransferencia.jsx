import { MenuItem, TextField, Box, Button } from "@mui/material";
import ContainerPrincipal from "../../components/ContainerPrincipal";
import Titulo from "../../components/Titulo";
import FormContainer from "../../components/FormContainer";
import { useState } from "react";
import DialogEnviar from "../../components/DialogEnviar";
import { useNavigate, useParams } from "react-router-dom";
import { getTransferencia, recusaTransferencia } from "../../common/utils";
import { useSetAtom } from "jotai";
import { snackbarAtom } from "../../atomStore";
import { useQueryClient } from "@tanstack/react-query";

export default function RecusaTranferencia() {
    const setSnackbar = useSetAtom(snackbarAtom)
    const queryClient = useQueryClient()

    const navigate = useNavigate()
    const [openConfirmar, setOpenConfirmar] = useState(false)
    const params = useParams();

    async function enviaRecusaForm(e) {
        e.preventDefault()
        const transferData = await getTransferencia(params.id)
        const formData = new FormData(e.target)

        formData.append("base_origem_id", transferData.data.base_origem_id)
        formData.append("base_destino_id", transferData.data.base_destino_id)
        formData.append("data_transferencia", transferData.data.data_transferencia)

        try {
            await recusaTransferencia(params.id, formData)
            setSnackbar({
                message: "Transferencia recusada com sucesso!",
                severity: "success",
                open: true,
            })
            await queryClient.invalidateQueries(['transferencias'])
            navigate("/transferencia")
        } catch(e) {
            setSnackbar({
                message: "Nao foi possivel enviar a solicitacao!",
                severity: "error",
                open: true,
            })
        }
    }

    return(
        <ContainerPrincipal>
            <Titulo
                voltaPara="/transferencia"
            >
                Recusa de Transferência N# {params.id}
            </Titulo>

            <FormContainer 
                id="recusa-transferencia"
                onSubmit={async (e) => await enviaRecusaForm(e)}
            >
                <TextField 
                    select
                    label="Motivo da Recusa"
                    name="observacao_motivo"
                    id="observacao_motivo"
                    SelectProps={{ defaultValue: ""}}
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
                    id="observacao"
                />
            </FormContainer>

            <Box className="flex gap-4 justify-end">
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