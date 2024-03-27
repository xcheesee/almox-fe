import { TextField, Box, MenuItem, Button, CircularProgress } from "@mui/material";
import ContainerPrincipal from "../../components/ContainerPrincipal";
import Titulo from "../../components/Titulo";
import { useState } from "react";
import DialogEnviar from "../../components/DialogEnviar";
import FormContainer from "../../components/FormContainer";
import { useQuery } from "@tanstack/react-query";
import { enviaNovaTransferencia, getLocais } from "../../common/utils";
import { useNavigate } from "react-router-dom";
import { useAtom, useAtomValue } from "jotai";
import { matTipoListAtom, snackbarAtom } from "../../atomStore";
import MateriaisBox from "../../components/MateriaisBox";

export default function NovaTransferencia () {

    const [snackbar, setSnackbar] = useAtom(snackbarAtom)
    const materiais = useAtomValue(matTipoListAtom)

    const [openConfirmar, setOpenConfirmar] = useState(false)
    const [baseOrigem, setBaseOrigem] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const locais = useQuery({
        queryKey: ['locais', "", "base"], 
        queryFn: () => getLocais("", ""), 
        //enabled: !(depto === ''),
        onSuccess: (res) => { 
            setBaseOrigem((res.find(local => local.id === +localStorage.getItem("local"))).id ?? "");
            //setBaseOrigem(res.length === 1 ? res[0].id : "");
        }

    })

    async function enviaTransferenciaForm(e) {
        e.preventDefault()
        setIsLoading(true)
        setErrors({})
        const formData = new FormData(e.target)
        try{
            await enviaNovaTransferencia(formData, materiais)
            setSnackbar({...snackbar, open: true, message: "Transferencia enviada com sucesso!", severity: "success"})
            navigate("/transferencia")
        } catch(e) {
            setErrors(e.errors)
            setSnackbar({...snackbar, open: true, message: "Nao foi possivel enviar a transferencia", severity: "error"})
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
                    helperText = {errors.hasOwnProperty("data_transferencia") ? errors.data_transferencia : "" }
                    id="data_transferencia"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required
                />

                <TextField
                    select
                    label="Base de Origem"
                    name="base_origem_id"
                    id="base_origem_id"
                    error={errors.hasOwnProperty("base_origem_id")}
                    helperText = {errors.hasOwnProperty("base_origem_id") ? errors.base_origem_id : "" }
                    value={baseOrigem}
                    onChange={e => {
                        if(localStorage.getItem("local") !== "") return
                        setBaseOrigem(e.target.value)
                    }} 
                    fullWidth
                    //disabled
                    required
                >
                    {locais.isLoading
                        ?<MenuItem value={0}>Carregando...</MenuItem>
                        :locais.data?.map((local, index) => <MenuItem value={local.id} key={`local${index}`}>{local.nome}</MenuItem>)
                    }
                </TextField>

                <TextField
                    select
                    label="Base de Destino"
                    name="base_destino_id"
                    id="base_destino_id"
                    error={errors.hasOwnProperty("base_destino_id")}
                    helperText = {errors.hasOwnProperty("base_destino_id") ? errors.base_destino_id : "" }
                    defaultValue=""
                    fullWidth
                    required
                >
                    {locais.isLoading
                        ?<MenuItem value={0}>Carregando...</MenuItem>
                        :locais.data?.map((local, index) => <MenuItem value={local.id} key={`destino${index}`}>{local.nome}</MenuItem>)
                    }
                </TextField>

                <MateriaisBox 
                    baseSelecionada={baseOrigem}
                    inputName='itens' 
                    entrada 
                />
            </FormContainer>

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
                texto="transferência"
                form="nova-transferencia"
            />

        </ContainerPrincipal>
    )
}