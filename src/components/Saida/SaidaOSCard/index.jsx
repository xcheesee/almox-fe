import { Box, Paper } from "@mui/material"
import { formataDateTime } from "../../../common/utils"

export default function SaidaOSCard({ ordemServico }) {
    if (!ordemServico) return <></>

    return (
        <Paper component={Box} elevation={4} >
            <Box className="bg-[#f3f6ff] py-4 px-8">
                <Box className="p-4 grid grid-cols-2 gap-4 justify-center">
                    <Box className="font-bold text-xl">Ordem de Servico Nº {ordemServico.id}</Box>
                    <Box className="text-gray-400 justify-self-end">
                        Inicio: {formataDateTime(ordemServico.data_inicio_servico)} - Fim: {formataDateTime(ordemServico.data_fim_servico) == "" ? "N/A" : formataDateTime(ordemServico.data_fim_servico)}
                    </Box>
                    <Box className="font-bold col-span-2 justify-self-center py-2">
                        {ordemServico.departamento}
                    </Box>
                    <Box>
                        <span className="font-bold flex flex-col">Origem:</span>
                        <span className="pl-4">{ordemServico.origem} </span>
                    </Box>
                    <Box>
                        <span className="font-bold flex flex-col">Local de Servico:</span>
                        <span className="pl-4">{ordemServico.local_servico}</span>
                    </Box>
                    <Box className="col-span-2 flex flex-col">
                        <span className="font-bold">Status:</span>
                        <span className="pl-4">{ordemServico.status}</span>
                    </Box>
                    <Box className="col-span-2 flex flex-col">
                        <span className="font-bold">Especificacoes:</span>
                        <span className="pl-4">{ordemServico.especificacao ?? "N/A"}</span>
                    </Box>
                    <Box className="col-span-2 flex flex-col">
                        <span className="font-bold">Observacoes:</span>
                        <span className="pl-4">{ordemServico.observacoes ?? "N/A"}</span>
                    </Box>
                </Box>
            </Box>
        </Paper>
    )
}
