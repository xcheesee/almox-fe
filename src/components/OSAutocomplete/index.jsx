import { Autocomplete, Box, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { getTabela } from "../../common/utils";
import { useQuery } from "@tanstack/react-query";

export default function OSAutocomplete ({
    disabled,
    setOrdemServico,
    //setBaseSelecionada,
    //setDeptoSelecionado,
    //setProfissionaisDisponiveis,
}) {

    const [ordens, setOrdens] = useState([])
    const [ordemId, setOrdemId] = useState("")

    const ordensQuery = useQuery({
        queryKey: ['ordemItens', ordemId],
        queryFn: async () => await getTabela("ordem_servicos", "" , `&filter[id]=${ordemId}`),
        onSuccess: (res) => {
            if (res.data.length === 0) {
                return setOrdens([{id:0}])
            } 
            setOrdens(res.data)
        }
    })

    return (
        <Autocomplete
            freeSolo
            disabled={disabled}
            id="ordem_servico"
            loading={ordensQuery.isFetching}
            getOptionLabel={(option) => `${option.id} - ${option?.especificacao ?? "N/A"}`}
            renderInput={ (params) => <TextField 
                    {...params} 
                    label="Ordem de Servico" 
                    onChange={async (e) => { 
                        setOrdens([])
                        setOrdemId(e.target.value) 
                    }}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <> 
                                { ordensQuery.isFetching ? <CircularProgress color="inherit" size={24} /> : null }
                                {params.InputProps.endAdornment}
                            </> 
                        )
                    }}
                />
            }
            renderOption={(props, option) => {
                if(option.id === 0) {
                    return (
                        <Box className="w-full justify-center p-4">
                            <Box>Nenhuma O.S Encontrada!</Box>
                        </Box>
                    )
                }
                return (
                    <Box {...props}>
                        <Box>O.S. Nº {option.id}: {option.especificacao ?? "N/A"}</Box>
                    </Box>
                )
            }}
            onChange={ async (event, value) => { await setOrdemServico(value) }}
            options={ordens}
            filterOptions={(x) => x}
        />
    )
}