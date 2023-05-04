import { TextField, Box, MenuItem, Paper } from "@mui/material";
import ContainerPrincipal from "../../components/ContainerPrincipal";
import Titulo from "../../components/Titulo";
import { useState } from "react";
import BoxMateriais from "../../components/BoxMateriais";

export default function NovaOcorrencia () {

    const [tipoOcorrencia, setTipoOcorrencia] = useState("")

    return(
        <ContainerPrincipal>
            <Titulo
                voltarPara="/ocorrencia"
            >
                Nova Ocorrência
            </Titulo>
            <Box 
                component="form"
                className="w-full py-4 px-8 grid gap-8"
            >
                <TextField
                    type="date"
                    label="Data da Ocorrencia"
                    name="data-ocorrencia"
                    id="data-ocorrencia"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                />
                <TextField
                    select
                    label="Base envolvida"
                    name="base"
                    id="base"
                    defaultValue={0}
                    fullWidth
                >
                    <MenuItem value={0}>Base 0</MenuItem>
                </TextField>
                <TextField
                    select
                    label="Tipo de Ocorrência"
                    name="ocorrencia"
                    value={tipoOcorrencia}
                    onChange={(e) => setTipoOcorrencia(e.target.value)}
                    id="base"
                    fullWidth
                >
                    <MenuItem value="avaria">Avaria</MenuItem>
                    <MenuItem value="furto">Furto</MenuItem>
                    <MenuItem value="extravio">Extravio</MenuItem>
                </TextField>
                {tipoOcorrencia === "furto" || tipoOcorrencia === "extravio"
                    ?<TextField 
                        name="arquivo_boletim_ocorrencia"
                        label="Boletim de Ocorrência"
                        type="file"
                        inputProps={{ accept: "image/*, application/pdf" }}
                        InputLabelProps={{ shrink: true }}
                        //error={errors.hasOwnProperty('arquivo_nota_fiscal')}
                        //helperText={errors.arquivo_nota_fiscal || ""}
                        fullWidth
                    />
                    : <></>
                }
            </Box>
            <BoxMateriais 
                label="Materiais envolvidos"
                deptoSelecionado="3"//valor temporario para teste
            />
            
        </ContainerPrincipal>
    )
}