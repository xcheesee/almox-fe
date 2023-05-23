import { Box, Dialog } from "@mui/material";
import BotaoNovo from "../../components/BotaoNovo";
import ContainerPrincipal from "../../components/ContainerPrincipal";
import Titulo from "../../components/Titulo";
import TabelaTransferencia from "../../components/TabelaTransferencia";
import FiltrosTransferencia from "../../components/FiltrosTransferencia";
import Paginacao from "../../components/Paginacao";
import { useQuery } from "@tanstack/react-query";
import { getTabela, getTransferencia } from "../../common/utils";
import { useAtomValue } from "jotai";
import { filtrosAtom, pageAtom, sortAtom } from "../../atomStore";
import DialogDetalhesTransferencia from "../../components/DialogDetalhesTransferencia";
import { useState } from "react";

export default function Transferencia () {

    const sort = useAtomValue(sortAtom)
    const page = useAtomValue(pageAtom)
    const filtros = useAtomValue(filtrosAtom)

    const [openDetalhes, setOpenDetalhes] = useState(false)
    const [transfData, setTransfData] = useState()

    const transferenciasQuery = useQuery({
        queryKey: ['transferencias', page, filtros, sort],
        queryFn: async () => await getTabela("transferencia", page, filtros, sort),
    })

    async function getSelectedTransfInfo(id) {
        const dados = await getTransferencia(id)
        setTransfData(dados.data)
        setOpenDetalhes(true)
    }

    return(
        <>
            <ContainerPrincipal>
                <Titulo voltarPara="/principal" >
                    Transferências
                </Titulo>

                <FiltrosTransferencia />

                <Box className="flex gap-4 justify-end">
                    <BotaoNovo caminho="/transferencia/nova-tranferencia" > Nova Transferencia </BotaoNovo>
                </Box>

                <TabelaTransferencia 
                    itens={transferenciasQuery?.data?.data} 
                    carregando={transferenciasQuery.isLoading}
                    getSelectedTransfInfo={getSelectedTransfInfo}
                />

                <Paginacao 
                    count={5}
                />

            </ContainerPrincipal>

        <Dialog open={openDetalhes} fullWidth>
            <DialogDetalhesTransferencia setOpenDetalhes={setOpenDetalhes} dados={transfData}/>
        </Dialog>
        </>
    )
}