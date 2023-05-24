import { useQuery } from "@tanstack/react-query";
import BotaoNovo from "../../components/BotaoNovo";
import ContainerPrincipal from "../../components/ContainerPrincipal";
import Paginacao from "../../components/Paginacao";
import Titulo from "../../components/Titulo";
import { getTabela } from "../../common/utils";
import TabelaOcorrencia from "../../components/TabelaOcorrencia";
import { useAtomValue } from "jotai";
import { filtrosAtom, pageAtom, sortAtom } from "../../atomStore";
import FiltrosOcorrencia from "../../components/FiltrosOcorrencia";

export default function Ocorrencia () {
    const sort = useAtomValue(sortAtom)
    const page = useAtomValue(pageAtom)
    const filtros = useAtomValue(filtrosAtom)

    const ocorrenciaQuery = useQuery({
        queryKey: ["ocorrencias", page, filtros, sort],
        queryFn: async () => await getTabela("ocorrencia", page, filtros, sort),
    })


    return(
        <ContainerPrincipal>
            <Titulo voltarPara="/principal" >
                Ocorrências
            </Titulo>

            <FiltrosOcorrencia />

            <BotaoNovo 
                caminho="/ocorrencia/nova-ocorrencia" 
                //display={authCreateEntrada(localStorage.getItem('perfil'))}
            >
                Nova Ocorrencia
            </BotaoNovo>

            <TabelaOcorrencia itens={ocorrenciaQuery?.data?.data} carregando={ocorrenciaQuery.isLoading} />

            <Paginacao count={ocorrenciaQuery?.meta?.page} />
        </ContainerPrincipal>
    )
}