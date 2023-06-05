import { Box, breadcrumbsClasses } from "@mui/material";
import BotaoNovo from "../../components/BotaoNovo";
import ContainerPrincipal from "../../components/ContainerPrincipal";
import Titulo from "../../components/Titulo";
import TabelaTransferencia from "../../components/Transferencia/TabelaTransferencia";
import FiltrosTransferencia from "../../components/Transferencia/FiltrosTransferencia";
import Paginacao from "../../components/Paginacao";
import { useQuery } from "@tanstack/react-query";
import { getMateriais, getTabela, getTransferencia } from "../../common/utils";
import { useAtomValue } from "jotai";
import { filtrosAtom, pageAtom, sortAtom } from "../../atomStore";
import DialogDetalhesTransferencia from "../../components/Transferencia/DialogDetalhesTransferencia";
import { useState } from "react";
import DialogConfirmarTransferencia from "../../components/Transferencia/DialogConfirmarTransferencia";

export default function Transferencia () {

    const sort = useAtomValue(sortAtom)
    const page = useAtomValue(pageAtom)
    const filtros = useAtomValue(filtrosAtom)

    const [openDetalhes, setOpenDetalhes] = useState(false)
    const [openConfirmar, setOpenConfirmar] = useState(false)
    const [transfData, setTransfData] = useState("")
    const [transfItensData, setTransfItensData] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const transferenciasQuery = useQuery({
        queryKey: ['transferencias', page, filtros, sort],
        queryFn: async () => await getTabela("transferencia", page, filtros, sort),
    })

    async function getSelectedTransfInfo(id, operation) {
        switch(operation) {
            case "visualizar":
                setIsLoading(true)
                setOpenDetalhes(true)
                const [dados, itensDados] = await Promise.all([getTransferencia(id), getMateriais("transferencia", id)])
                setTransfData(dados.data)
                setTransfItensData(itensDados)
                setIsLoading(false)
                break;
            case "confirmar":
                setIsLoading(true)
                setOpenConfirmar(true)
                const [confDados, confItensDados] = await Promise.all([getTransferencia(id), getMateriais("transferencia", id)])
                setTransfData(confDados.data)
                setTransfItensData(confItensDados)
                setIsLoading(false)
                break;
            default:
                break;
        }
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
                    count={transferenciasQuery?.meta?.page}
                />

            </ContainerPrincipal>

            <DialogDetalhesTransferencia 
                openDetalhes={openDetalhes}
                setOpenDetalhes={setOpenDetalhes} 
                dados={transfData} 
                isLoading={isLoading}
                materiais={transfItensData}/>

            <DialogConfirmarTransferencia 
                openConfirmar={openConfirmar}
                setOpenConfirmar={setOpenConfirmar} 
                dados={transfData} 
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                materiais={transfItensData}/>
        </>
    )
}