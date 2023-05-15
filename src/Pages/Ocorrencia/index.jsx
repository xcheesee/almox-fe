import { useQuery } from "@tanstack/react-query";
import BotaoNovo from "../../components/BotaoNovo";
import ContainerPrincipal from "../../components/ContainerPrincipal";
import Paginacao from "../../components/Paginacao";
import Titulo from "../../components/Titulo";
import { getTabela } from "../../common/utils";
import TabelaOcorrencia from "../../components/TabelaOcorrencia";

export default function Ocorrencia () {
    const ocorrenciaQuery = useQuery({
        queryKey: ["ocorrencias"],
        queryFn: async () => await getTabela("ocorrencia"),
        onSuccess: (res) => console.log(res)
    })
    return(
        <ContainerPrincipal>
            <Titulo
                voltarPara="/principal"
            >
                Ocorrências
            </Titulo>
            <BotaoNovo 
                caminho="/ocorrencia/nova-ocorrencia" 
                //display={authCreateEntrada(localStorage.getItem('perfil'))}
            >
                Nova Ocorrencia
            </BotaoNovo>
            <TabelaOcorrencia itens={ocorrenciaQuery?.data?.ocorrencia} carregando={ocorrenciaQuery.isLoading} />
            <Paginacao count={10} />
        </ContainerPrincipal>
    )
}