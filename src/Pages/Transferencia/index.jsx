import { Box } from "@mui/material";
import BotaoNovo from "../../components/BotaoNovo";
import ContainerPrincipal from "../../components/ContainerPrincipal";
import Titulo from "../../components/Titulo";
import TabelaTransferencia from "../../components/Transferencia/TabelaTransferencia";
import FiltrosTransferencia from "../../components/Transferencia/FiltrosTransferencia";
import Paginacao from "../../components/Paginacao";
import { useQuery } from "@tanstack/react-query";
import { authCreateTransf, getMateriais, getRegistro, getTabela } from "../../common/utils";
import { useAtomValue, useSetAtom } from "jotai";
import { filtrosAtom, pageAtom, snackbarAtom, sortAtom } from "../../atomStore";
import DialogDetalhesTransferencia from "../../components/Transferencia/DialogDetalhesTransferencia";
import { useState } from "react";
import DialogConfirmarTransferencia from "../../components/Transferencia/DialogConfirmarTransferencia";
import { useRef } from "react";
import { useAuthenticatedQuery } from "../../common/utils/hooks";

export default function Transferencia () {

    const sort = useAtomValue(sortAtom)
    const page = useAtomValue(pageAtom)
    const filtros = useAtomValue(filtrosAtom)
    const setSnackbar = useSetAtom(snackbarAtom)

    const [openDetalhes, setOpenDetalhes] = useState(false)
    const [openConfirmar, setOpenConfirmar] = useState(false)
    const [transfData, setTransfData] = useState("")
    const [transfItensData, setTransfItensData] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const transferenciasQuery = useAuthenticatedQuery({
        queryKey: ['transferencias', page, filtros, sort],
        queryFn: async () => await getTabela("transferencia", page, filtros, sort),
        onSuccess: (res) => pageCountRef.current = res.meta.last_page,
        onError: error => setSnackbar({
            open: true,
            severity: "error",
            message: `Nao foi possivel recuperar os dados de transferencia: ${error.status} (${error.message ?? error.statusText})`
        })
    })

    const pageCountRef = useRef(transferenciasQuery?.data?.meta?.last_page ?? 1)

    async function getSelectedTransfInfo(id, operation) {
        setIsLoading(true)
        let dados, itensDados;
        try{
            [dados, itensDados] = await Promise.all([getRegistro('transferencia', id), getMateriais("transferencia", id)])
        } catch(e) {
            setSnackbar({
                open: true,
                severity: 'error',
                message: `Nao foi possivel recuperar a transferencia: ${e.status} (${e.message})`
            })
            setIsLoading(false)
            return
        }
        switch(operation) {
            case "visualizar":
                setOpenDetalhes(true)
                setTransfData(dados)
                setTransfItensData(itensDados?.data)
                setIsLoading(false)
                break;
            case "confirmar":
                setOpenConfirmar(true)
                setTransfData(dados)
                setTransfItensData(itensDados?.data)
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
                { authCreateTransf(localStorage.getItem("perfil"))
                    ?<Box className="flex gap-4 justify-end">
                        <BotaoNovo caminho="/transferencia/nova-tranferencia" > Nova Transferencia </BotaoNovo>
                    </Box>
                    :<></>
                }

                <TabelaTransferencia 
                    itens={transferenciasQuery?.data?.data} 
                    carregando={transferenciasQuery.isLoading}
                    getSelectedTransfInfo={getSelectedTransfInfo}
                />

                <Paginacao 
                    count={pageCountRef.current}
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