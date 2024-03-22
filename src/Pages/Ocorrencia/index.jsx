import { useQuery } from "@tanstack/react-query";
import BotaoNovo from "../../components/BotaoNovo";
import ContainerPrincipal from "../../components/ContainerPrincipal";
import Paginacao from "../../components/Paginacao";
import Titulo from "../../components/Titulo";
import { authCreateOcorrencia, getTabela } from "../../common/utils";
import { useAtomValue, useSetAtom } from "jotai";
import { filtrosAtom, pageAtom, snackbarAtom, sortAtom } from "../../atomStore";
import FiltrosOcorrencia from "../../components/Ocorrencia/FiltrosOcorrencia";
import TabelaOcorrencia from "../../components/Ocorrencia/TabelaOcorrencia";
import { useRef } from "react";
import { useAuthenticatedQuery } from "../../common/utils/hooks";

export default function Ocorrencia () {
    const sort = useAtomValue(sortAtom)
    const page = useAtomValue(pageAtom)
    const filtros = useAtomValue(filtrosAtom)
    const setSnackbar = useSetAtom(snackbarAtom)

    const ocorrenciaQuery = useAuthenticatedQuery({
        queryKey: ["ocorrencias", page, filtros, sort],
        queryFn: async () => await getTabela("ocorrencia", page, filtros, sort),
        onSuccess: res => pageCountRef.current = res.meta.last_page,
        onError: error => {
            setSnackbar({
                open: true,
                severity: 'error',
                message: `Nao foi possiver recuperar a lista de ocorrencias: ${error.status} (${error.message ?? error.statusText})`
            })
        }
    })

    const pageCountRef = useRef(ocorrenciaQuery?.data?.meta?.last_page ?? 1)

    return(
        <ContainerPrincipal>
            <Titulo voltarPara="/principal" >
                Ocorrências
            </Titulo>

            <FiltrosOcorrencia />

            {authCreateOcorrencia(localStorage.getItem("perfil"))
                ?<BotaoNovo caminho="/ocorrencia/nova-ocorrencia" > Nova Ocorrencia </BotaoNovo>
                :<></>
            }

            <TabelaOcorrencia 
                itens={ocorrenciaQuery?.data?.data} 
                carregando={ocorrenciaQuery.isLoading} 
            />

            <Paginacao count={pageCountRef.current} />
        </ContainerPrincipal>
    )
}