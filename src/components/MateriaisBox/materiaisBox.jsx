import { useQuery } from "@tanstack/react-query";
import { getMatItens, getMatTipos, primeiraLetraMaiuscula } from "../../common/utils";
import { Box, CircularProgress, MenuItem, TextField, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import MaterialList from "./MaterialList";

function ConditionalTooltipWrapper({enabled, texto, children}) {
    if(!enabled) return children
    return (
        <Tooltip title={texto}>
            {children}
        </Tooltip>
    )
}

export default function MateriaisBox({
    baseSelecionada="",
    deptoSelecionado="",
    defaultValue=[],
    inputName="",
    entrada=false
}) {
    const [selectedTipo, setSelectedTipo] = useState("")
    const tipos = useQuery({
        queryKey: ['tiposMats', deptoSelecionado], 
        queryFn: () => getMatTipos(deptoSelecionado),
        enabled: !!deptoSelecionado
    });

    const materiais = useQuery({
        queryKey: ['matsByTipo', selectedTipo, deptoSelecionado, baseSelecionada],
        queryFn: () => getMatItens(selectedTipo, true, baseSelecionada, deptoSelecionado),
        enabled: !!selectedTipo && !entrada,
    })

    const materiaisEntrada = useQuery({
        queryKey: ['matsEntrada', selectedTipo, deptoSelecionado, baseSelecionada],
        queryFn: () => getMatItens(selectedTipo, false, baseSelecionada, deptoSelecionado),
        enabled: entrada && !!selectedTipo,
    })

    if(tipos.isLoading) return <Box className="w-full flex justify-center"><CircularProgress size={32} /></Box>

    return ( 
        <Box className="grid grid-cols-3 gap-4 w-full py-4">
            <Typography className="col-span-3 !text-3xl !font-thin">Materiais</Typography>
            <ConditionalTooltipWrapper enabled={baseSelecionada==="" && !entrada} texto="Selecione uma base">
                <TextField
                    select
                    label="Tipo de material"
                    value={selectedTipo}
                    onChange={(e) => setSelectedTipo(e.target.value)}
                    className="col-span-2"
                    disabled={baseSelecionada === "" && !entrada}
                >
                    {tipos?.data?.data?.map((val, i) => 
                        <MenuItem value={val.id} key={`m-item-${i}`} >
                            {primeiraLetraMaiuscula(val.nome)}
                        </MenuItem>)
                    }
                </TextField>
            </ConditionalTooltipWrapper>
            <Box className="col-span-3">
                <MaterialList 
                    materiais={entrada ? materiaisEntrada : materiais} 
                    isLoading={entrada ? materiaisEntrada.isLoading : materiais.isLoading} 
                    enabled={!!selectedTipo} 
                    defaultValue={defaultValue} 
                    inputName={inputName}
                    entrada={entrada}
                />
            </Box>
        </Box>);
}