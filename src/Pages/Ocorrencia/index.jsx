import BotaoNovo from "../../components/BotaoNovo";
import ContainerPrincipal from "../../components/ContainerPrincipal";
import Paginacao from "../../components/Paginacao";
import TabelaEntrada from "../../components/TabelaEntrada";
import Titulo from "../../components/Titulo";

export default function Ocorrencia () {
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
            <TabelaEntrada />
            <Paginacao count={10} />
        </ContainerPrincipal>
    )
}