import { MenuItem, TextField, Box } from "@mui/material";
import ContainerPrincipal from "../../components/ContainerPrincipal";
import Titulo from "../../components/Titulo";

export default function RecusaTranferencia() {
    return(
        <ContainerPrincipal>
            <Titulo
                voltaPara="/transferencia"
            >
                Recusa de Transferencia
            </Titulo>

            <Box 
                component="form"
                className="w-full py-4 px-8 grid gap-8"
            >
                <TextField 
                    select
                    label="Motivo da Recusa"
                    name="observacao_motivo"
                    id="observacao_motivo"
                >
                    <MenuItem value="nao_enviado">Nao Enviado</MenuItem>
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
            </Box>
        </ContainerPrincipal>
    )
}