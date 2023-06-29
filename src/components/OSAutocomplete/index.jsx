import { Autocomplete, Box, CircularProgress, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { getRegistro, getTabela } from "../../common/utils";

export default function OSAutocomplete ({
    disabled,
    ordemServico,
    setOrdemServico,
}) {

    const [ordemSelecionada, setOrdemSelecionada] = useState({id: 0})
    const [isLoading, setIsLoading] = useState(false)
    async function fetchOrdem (id) {
        const res = await getTabela("ordem_servicos", "" , `&filter[id]=${id}`)
        setOrdemSelecionada(res.data[0] ?? {id: 0})
    }

    return (
        <Autocomplete
            freeSolo
            disabled={disabled}
            id="ordem_servico"
            renderInput={ (params) => <TextField 
                {...params} 
                label="Ordem de Servico" 
                onChange={async (e) => {
                    setIsLoading(true)
                    await new Promise((res, rej) => {
                        setTimeout(() => res(), 3000)
                    })
                    try{
                        await fetchOrdem(e.target.value)
                    } catch(e) {
                        setOrdemSelecionada({id: 0})
                    }
                    setIsLoading(false)
                }}

                
            />}
            renderOption={(props, option) => {
                if (isLoading) {return (
                    <Box className=" p-4 flex items-center justify-items-center w-full">
                        <CircularProgress size={24} className="self-center justify-self-center" />
                    </Box>
                )} else if(option.id === 0) {
                    return (
                        <Box className="w-full justify-center p-4">
                            <Box>O.S Nao Encontrada!</Box>
                        </Box>
                    )
                }
                return (<Paper component="div" elevation={4} className="m-4" >
                    <Box {...props}>
                        <Box className="p-4 grid grid-cols-2 gap-4 justify-center" >
                            <Box>Ordem de Servico Nº {option.id}</Box>
                            <Box className="text-gray-400 justify-self-end">Inicio: {option.data_inicio_servico} - Fim: {option.data_fim_servico ?? "N/A"}</Box>
                            <Box className="font-bold col-span-2 justify-self-center py-2">{option.departamento}</Box>
                            <Box>Origem: {option.origem}</Box>
                            <Box>Local de Servico: {option.local_servico}</Box>
                            <Box>Status: {option.status}</Box>
                            <Box>Especificacoes: {option.especificacao ?? "N/A"}</Box>
                            <Box>Observacoes: {option.observacoes ?? "N/A"}</Box>
                        </Box>
                    </Box>
                </Paper>)
            }}
            onChange={ async (event, value) => {
                //await new Promise((res, rej) => {
                //    setTimeout(() => res(), 3000)
                //})
                console.log(value)
            }}
            options={[ordemSelecionada]}
            getOptionLabel={(option) => `${option.id} - ${option.local_servico}`}
            filterOptions={(x) => x}
        />
    )
}