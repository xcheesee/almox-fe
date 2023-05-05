import { TextField, Box, MenuItem, Button } from "@mui/material";
import ContainerPrincipal from "../../components/ContainerPrincipal";
import Titulo from "../../components/Titulo";
import { useState } from "react";
import BoxMateriais from "../../components/BoxMateriais";
import DialogEnviar from "../../components/DialogEnviar";
import FormContainer from "../../components/FormContainer";

export default function NovaOcorrencia () {

    const [tipoOcorrencia, setTipoOcorrencia] = useState("")
    const [openConfirmar, setOpenConfirmar] = useState(false)

    return(
        <ContainerPrincipal>
            <Titulo
                voltaPara="/ocorrencia"
            >
                Nova Ocorrência
            </Titulo>

            <FormContainer 
                id="nova-ocorrencia"
            >
                <TextField
                    type="date"
                    label="Data da Ocorrência"
                    name="data_ocorrencia"
                    id="data_ocorrencia"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                />

                <TextField
                    select
                    label="Base envolvida"
                    name="local_id"
                    id="local_id"
                    defaultValue={0}
                    fullWidth
                >
                    <MenuItem value={0}>Base 0</MenuItem>
                </TextField>

                <TextField
                    select
                    label="Tipo de Ocorrência"
                    name="tipo_ocorrencia"
                    id="tipo_ocorrencia"
                    value={tipoOcorrencia}
                    onChange={(e) => setTipoOcorrencia(e.target.value)}
                    fullWidth
                >
                    <MenuItem value="avaria">Avaria</MenuItem>
                    <MenuItem value="furto">Furto</MenuItem>
                    <MenuItem value="extravio">Extravio</MenuItem>
                </TextField>

                {tipoOcorrencia === "furto" || tipoOcorrencia === "extravio"
                    ?<TextField 
                        name="boletim_ocorrencia"
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
            </FormContainer>

            <BoxMateriais 
                label="Materiais envolvidos"
                deptoSelecionado="3"//valor temporario para teste
            />

            <Box className="flex gap-4 justify-end">
                <Button onClick={() => setOpenConfirmar(true)}>Enviar</Button>
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