import { Box, Snackbar } from "@mui/material";
import BotaoNovo from "../../components/BotaoNovo";
import ContainerPrincipal from "../../components/ContainerPrincipal";
import Titulo from "../../components/Titulo";
import TabelaTransferencia from "../../components/TabelaTransferencia";
import FiltrosTransferencia from "../../components/FiltrosTransferencia";
import Paginacao from "../../components/Paginacao";
import { useQuery } from "@tanstack/react-query";
import { getTabela, getTransferencias } from "../../common/utils";
import { useAtom } from "jotai";
import { snackbarAtom } from "../../atomStore";

export default function Transferencia () {
    const transferenciasQuery = useQuery({
        queryKey: ['transferencias'],
        queryFn: async () => await getTabela("transferencia"),
        onSuccess: (res) => console.log(res)
    })

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
                    caminho="/transferencia/nova-tranferencia"
                >Nova Transferencia</BotaoNovo>
            </Box>

            <TabelaTransferencia 
                itens={transferenciasQuery?.data?.transferencias} 
                carregando={transferenciasQuery.isLoading}
            />


            <Paginacao 
                count={5}
            />

        </ContainerPrincipal>
    )
}