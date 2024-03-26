import { useQuery } from "@tanstack/react-query";
import { getMatItens, getMatTipos, primeiraLetraMaiuscula } from "../../common/utils";
import { Box, CircularProgress, MenuItem, TextField, Typography } from "@mui/material";
import { useState } from "react";
import MaterialList from "./MaterialList";

export default function MateriaisBox({
    baseSelecionada="",
    deptoSelecionado="",
}) {
    const [selectedTipo, setSelectedTipo] = useState()
    const tipos = useQuery({
        queryKey: ['tiposMats'], 
        queryFn: getMatTipos,
    });

    const materiais = useQuery({
        queryKey: ['matsByTipo', selectedTipo],
        queryFn: () => getMatItens(selectedTipo, true, baseSelecionada, deptoSelecionado),
        enabled: !!selectedTipo,
    })

    if(tipos.isLoading) return <Box className="w-full flex justify-center"><CircularProgress size={32} /></Box>

    return ( 
        <Box className="grid grid-cols-3 gap-4 w-full">
            <Typography className="col-span-3 !text-3xl !font-thin">Materiais</Typography>
            <TextField
                select
                label="Tipo de material"
                value={selectedTipo}
                onChange={(e) => setSelectedTipo(e.target.value)}
                className="col-span-2"
            >
                {tipos?.data?.data?.map((val, i) => 
                    <MenuItem value={val.id} key={`m-item-${i}`} >
                        {primeiraLetraMaiuscula(val.nome)}
                    </MenuItem>)
                }
            </TextField>
            <Box className="col-span-3">
                <MaterialList materiais={materiais} isLoading={materiais.isLoading} enabled={!!selectedTipo} />
            </Box>
        </Box>);
}