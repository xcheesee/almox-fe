import { TextField, Box, MenuItem, Button } from "@mui/material";
import ContainerPrincipal from "../../components/ContainerPrincipal";
import Titulo from "../../components/Titulo";
import { useState } from "react";
import BoxMateriais from "../../components/BoxMateriais";
import DialogEnviar from "../../components/DialogEnviar";
import FormContainer from "../../components/FormContainer";

export default function NovaTransferencia () {

    const [openConfirmar, setOpenConfirmar] = useState(false)

    return(
        <ContainerPrincipal>
            <Titulo
                voltaPara="/transferencia"
            >
                Nova Transferência
            </Titulo>

            <FormContainer 
                id="nova-transferencia"
            >
                <TextField
                    type="date"
                    label="Data de Transferência"
                    name="data-transferencia"
                    id="data-transferencia"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                />

                <TextField
                    select
                    label="Base de Origem"
                    name="base_origem_id"
                    id="base_origem_id"
                    defaultValue={0}
                    fullWidth
                >
                    <MenuItem value={0}>Base 0</MenuItem>
                </TextField>

                <TextField
                    select
                    label="Base de Destino"
                    name="base_destino_id"
                    id="base_destino_id"
                    defaultValue={0}
                    fullWidth
                >
                    <MenuItem value={0}>Base 0</MenuItem>
                </TextField>
            </FormContainer>

            <BoxMateriais 
                label="Materiais Solicitados"
                deptoSelecionado="3"//valor temporario para teste
            />

            <Box className="flex gap-4 justify-end">
                <Button onClick={() => setOpenConfirmar(true)}>Enviar</Button>
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