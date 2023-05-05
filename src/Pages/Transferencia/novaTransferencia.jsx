import { TextField, Box, MenuItem, Paper } from "@mui/material";
import ContainerPrincipal from "../../components/ContainerPrincipal";
import Titulo from "../../components/Titulo";
import { useState } from "react";
import BoxMateriais from "../../components/BoxMateriais";

export default function NovaTransferencia () {

    const [tipoOcorrencia, setTipoOcorrencia] = useState("")

    return(
        <ContainerPrincipal>
            <Titulo
                voltaPara="/ocorrencia"
            >
                Nova Ocorrência
            </Titulo>
            <Box 
                component="form"
                className="w-full py-4 px-8 grid gap-8"
            >
                <TextField
                    type="date"
                    label="Data de Transferência"
                    name="data-transferencia"
                    id="data-ocorrencia"
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
            </Box>
            <BoxMateriais 
                label="Materiais Solicitados"
                deptoSelecionado="3"//valor temporario para teste
            />
            
        </ContainerPrincipal>
    )
}