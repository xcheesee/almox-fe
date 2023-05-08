import { TextField, Box, MenuItem, Button, Menu } from "@mui/material";
import ContainerPrincipal from "../../components/ContainerPrincipal";
import Titulo from "../../components/Titulo";
import { useState } from "react";
import BoxMateriais from "../../components/BoxMateriais";
import DialogEnviar from "../../components/DialogEnviar";
import FormContainer from "../../components/FormContainer";
import { useQuery } from "@tanstack/react-query";
import { getLocais } from "../../common/utils";

export default function NovaTransferencia () {

    const [openConfirmar, setOpenConfirmar] = useState(false)
    const [baseOrigem, setBaseOrigem] = useState("")

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
                    value={baseOrigem}
                    onChange={e => setBaseOrigem(e.target.value)} 
                    fullWidth
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
                    fullWidth
                >
                    {locais.isLoading
                        ?<MenuItem value={0}>Carregando...</MenuItem>
                        :locais.data?.map((local, index) => <MenuItem value={local.id} key={`destino${index}`}>{local.nome}</MenuItem>)
                    }
                </TextField>
            </FormContainer>

            <BoxMateriais 
                label="Materiais Solicitados"
                baseSelecionada={baseOrigem}//valor temporario para teste
                tooltipText="Selecione uma base antes de adicionar materiais!"
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