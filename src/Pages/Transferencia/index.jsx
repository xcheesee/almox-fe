import { Box } from "@mui/material";
import BotaoNovo from "../../components/BotaoNovo";
import ContainerPrincipal from "../../components/ContainerPrincipal";
import Titulo from "../../components/Titulo";
import TabelaTransferencia from "../../components/TabelaTransferencia";
import FiltrosTransferencia from "../../components/FiltrosTransferencia";

export default function Transferencia () {

    return(
        <ContainerPrincipal>
            <Titulo
                voltarPara="/principal"
            >
                Transferências
            </Titulo>

            <FiltrosTransferencia />

            <Box className="flex gap-4 justify-end">
                <BotaoNovo
                    variant="text"
                    cor="error"
                    caminho="/transferencia/recusa-transferencia"
                >Nova Recusa</BotaoNovo>
                <BotaoNovo
                    caminho="/transferencia/nova-tranferencia"
                >Nova Transferencia</BotaoNovo>
            </Box>

            <TabelaTransferencia />

        </ContainerPrincipal>
    )
}