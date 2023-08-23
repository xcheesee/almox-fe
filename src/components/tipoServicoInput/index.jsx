import { MenuItem, TextField } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { getTiposServico } from "../../common/utils"

export default function TipoServicoInput({defaultValue="", deptoSelecionado}) {
    const tipos_servico = useQuery({
        queryFn: () => {
            if(!deptoSelecionado) return []
            return getTiposServico({depto: deptoSelecionado})
        },
        queryKey: ["tipos_servicos", deptoSelecionado]
    })

    return(
        <TextField 
            select
            label="Tipo de Serviço"
            name="tipo_servico_id"
            defaultValue={defaultValue || ""}
            id="tipo_servico_id"
            disabled={!deptoSelecionado || tipos_servico.isLoading}
        >
            {tipos_servico?.data?.servicos
                ?  tipos_servico?.data?.servicos?.map( (servico, index) => <MenuItem value={servico.id} key={index}>{servico.servico}</MenuItem> )
                : <MenuItem value=""></MenuItem>
            }
        </TextField>
    )
}