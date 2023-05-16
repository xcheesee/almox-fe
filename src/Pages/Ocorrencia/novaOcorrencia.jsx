import { TextField, Box, MenuItem, Button, CircularProgress } from "@mui/material";
import ContainerPrincipal from "../../components/ContainerPrincipal";
import Titulo from "../../components/Titulo";
import { useState } from "react";
import BoxMateriais from "../../components/BoxMateriais";
import DialogEnviar from "../../components/DialogEnviar";
import FormContainer from "../../components/FormContainer";
import { enviaNovaOcorrencia, getLocais } from "../../common/utils";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { snackbarAtom } from "../../atomStore";
import { useNavigate } from "react-router-dom";

export default function NovaOcorrencia () {

    const [tipoOcorrencia, setTipoOcorrencia] = useState("")
    const [openConfirmar, setOpenConfirmar] = useState(false)
    const [baseOrigem, setBaseOrigem] = useState("")
    const [snackbar, setSnackbar] = useAtom(snackbarAtom)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const locais = useQuery({
        queryKey: ['locais', "", "base"], 
        queryFn: () => getLocais("", "base"), 
        //enabled: !(depto === ''),
        onSuccess: (res) => {
            setBaseOrigem(res.length === 1 ? res[0].id : "")
        }

    })

    return(
        <ContainerPrincipal>
            <Titulo
                voltaPara="/ocorrencia"
            >
                Nova Ocorrência
            </Titulo>

            <FormContainer 
                id="nova-ocorrencia"
                onSubmit={async (e) => {
                    e.preventDefault()
                    setIsLoading(true)
                    const formData = new FormData(e.target)
                    try {
                        await enviaNovaOcorrencia(formData)
                        setSnackbar({...snackbar, open: true, message: "Ocorrencia enviada com sucesso!", severity: "success"})
                        navigate("/ocorrencia")

                    } catch(e){
                        setSnackbar({...snackbar, open: true, message: "Nao foi possivel enviar a ocorrencia", severity: "error"})
                    }
                    setIsLoading(false)
                }}
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
                    SelectProps={{value: baseOrigem, onChange: (e) => setBaseOrigem(e.target.value)}}
                    fullWidth
                >
                    {locais.isLoading
                        ?<MenuItem>Carregando...</MenuItem>
                        :locais?.data?.map((local, index) => <MenuItem value={local.id} key={`base${index}`}>{local.nome}</MenuItem>)
                    }
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
                        //type="file"
                        value="string"
                        //inputProps={{ accept: "image/*, application/pdf" }}
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
                baseSelecionada={baseOrigem}
                tooltipText="Selecione uma base antes de adicionar materiais!"
            />

            <Box className="flex gap justify-end items-center">
                    { isLoading
                        ? <CircularProgress size={24}/>
                        : <></>
                    }
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