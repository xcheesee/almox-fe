import { Autocomplete, Box, CircularProgress, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { getRegistro, getTabela } from "../../common/utils";

export default function OSAutocomplete ({
    disabled,
    setOrdemServico,
    setBaseSelecionada,
    setDeptoSelecionado,
    setProfissionaisDisponiveis,
}) {

    const [ordens, setOrdens] = useState([{id: 0}])
    const [isLoading, setIsLoading] = useState(false)
    async function fetchOrdem (id) {
        const res = await getTabela("ordem_servicos", "" , `&filter[id]=${id}`)
        setOrdens(res.data ?? [{id: 0}])
    }

    return (
        <Autocomplete
            freeSolo
            disabled={disabled}
            id="ordem_servico"
            loading={isLoading}
            renderInput={ (params) => <TextField 
                {...params} 
                label="Ordem de Servico" 
                onChange={async (e) => {
                    setOrdens([])
                    setIsLoading(true)
                    await new Promise((res, rej) => {
                        setTimeout(() => res(), 3000)
                    })
                    try{
                        await fetchOrdem(e.target.value)
                    } catch(e) {
                        setOrdens([{id: 0}])
                    }
                    setIsLoading(false)
                }}
                InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                        <> 
                            { isLoading ? <CircularProgress color="inherit" size={24} /> : null }
                            {params.InputProps.endAdornment}
                        </> 
                    )
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
                return (
                    <Box {...props}>
                        <Box>O.S. Nº {option.id}: {option.especificacao ?? "N/A"}</Box>
                    </Box>
                )
            }}
            onChange={ async (event, value) => {
                await setOrdemServico(value)
            }}
            options={ordens}
            getOptionLabel={(option) => `${option.id} - ${option.local_servico}`}
            filterOptions={(x) => x}
        />
    )
}