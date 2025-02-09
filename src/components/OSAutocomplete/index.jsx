import { Autocomplete, Box, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { getTabela } from "../../common/utils";
import { useQuery } from "@tanstack/react-query";

export default function OSAutocomplete({
    disabled = false,
    setOrdemServico = () => null,
    clearForm = () => null,
    onChange = () => null,
    error = "",
    defaultValue = "",
}) {

    const [ordens, setOrdens] = useState([])
    const [ordemId, setOrdemId] = useState(defaultValue ?? "")

    const ordensQuery = useQuery({
        queryKey: ['ordemItens', ordemId],
        queryFn: async () => await getTabela("ordem_servicos", "", `&filter[id]=${ordemId}`),
        onSuccess: (res) => {
            if (res.data.length === 0) {
                return setOrdens([{ id: 0 }])
            }
            setOrdens(res.data)
        }
    })

    if (ordensQuery.isLoading) return (
        <Box className='flex justify-center'>
            <CircularProgress size={48} />
        </Box>
    )

    return (
        <Autocomplete
            disabled={disabled || defaultValue !== ""}
            id="ordem_servico"
            loading={ordensQuery.isFetching}
            getOptionLabel={(option) => `${option.id}`}
            renderInput={(params) => <TextField
                {...params}
                name="ordem_servico_id"
                value={ordemId}
                label="Ordem de Servico"
                error={!!error}
                helperText={error}
                onChange={async (e) => {
                    setOrdens([]);
                    setOrdemId(e.target.value);
                }}
                InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                        <>
                            {ordensQuery.isFetching ? <CircularProgress color="inherit" size={24} /> : null}
                            {params.InputProps.endAdornment}
                        </>
                    )
                }}
            />
            }
            renderOption={(props, option) => {
                if (option.id === 0) {
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
            onChange={async (event, value, reason) => {
                if (reason === "clear") {
                    setOrdemId("")
                    return clearForm()
                }
                onChange()
                await setOrdemServico(value)
            }}
            options={ordens}
            filterOptions={(x) => x}
            defaultValue={{ id: defaultValue }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
        />
    )
}
