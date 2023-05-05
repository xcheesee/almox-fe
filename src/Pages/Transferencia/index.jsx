import { Box } from "@mui/material";
import BotaoNovo from "../../components/BotaoNovo";
import ContainerPrincipal from "../../components/ContainerPrincipal";
import Titulo from "../../components/Titulo";

export default function Transferencia () {
    return(
        <ContainerPrincipal>
            <Titulo
                voltarPara="/principal"
            >
                Transferências
            </Titulo>
            <Box className="flex gap-4 justify-end">
                <BotaoNovo
                    variant="text"
                    cor="error"
                    caminho="/transferencia/recusa"
                >Nova Recusa</BotaoNovo>
                <BotaoNovo
                    caminho="/transferencia/nova-tranferencia"
                >Nova Transferencia</BotaoNovo>
            </Box>
        </ContainerPrincipal>
    )
}