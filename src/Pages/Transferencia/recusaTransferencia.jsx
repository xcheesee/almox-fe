import { MenuItem, TextField, Box, Button } from "@mui/material";
import ContainerPrincipal from "../../components/ContainerPrincipal";
import Titulo from "../../components/Titulo";
import FormContainer from "../../components/FormContainer";
import { useState } from "react";
import DialogEnviar from "../../components/DialogEnviar";

export default function RecusaTranferencia() {

    const [openConfirmar, setOpenConfirmar] = useState(false)
    return(
        <ContainerPrincipal>
            <Titulo
                voltaPara="/transferencia"
            >
                Recusa de Transferência
            </Titulo>

            <FormContainer 
                id="recusa-transferencia"
            >
                <TextField 
                    select
                    label="Motivo da Recusa"
                    name="observacao_motivo"
                    id="observacao_motivo"
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