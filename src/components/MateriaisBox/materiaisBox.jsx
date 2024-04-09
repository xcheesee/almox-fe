import { useQuery } from "@tanstack/react-query";
import { getMatItens, getMatTipos, primeiraLetraMaiuscula } from "../../common/utils";
import { Box, CircularProgress, MenuItem, TextField, Typography } from "@mui/material";
import { useState } from "react";
import MaterialList from "./MaterialList";
import ConditionalTooltip from "../ConditionalTooltip";

export default function MateriaisBox({
    baseSelecionada="",
    deptoSelecionado="",
    defaultValue=[],
    inputName="",
    entrada=false,
    errors={}
}) {
    const [selectedTipo, setSelectedTipo] = useState("")
    const tipos = useQuery({
        queryKey: ['tiposMats', deptoSelecionado], 
        queryFn: () => getMatTipos({depto: deptoSelecionado}),
        enabled: !!deptoSelecionado || entrada
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

    if(tipos.isLoading && !!deptoSelecionado) return <Box className="w-full flex justify-center"><CircularProgress size={32} /></Box>

    return ( 
        <Box className="grid gap-4 w-full py-4">
            <Typography className="!text-3xl !font-thin">Materiais</Typography>

            <ConditionalTooltip 
                enabled={deptoSelecionado === "" || (baseSelecionada==="" && !entrada)} 
                texto={deptoSelecionado === "" ? "Selecione um Departamento!" : "Selecione uma base"}
            >
                <TextField
                    select
                    label="Tipo de material"
                    value={selectedTipo}
                    onChange={(e) => setSelectedTipo(e.target.value)}
                    disabled={deptoSelecionado === "" || (baseSelecionada === "" && !entrada)}
                >
                    {tipos?.data?.data?.map((val, i) => 
                        <MenuItem value={val.id} key={`m-item-${i}`} >
                            {primeiraLetraMaiuscula(val.nome)}
                        </MenuItem>
                        ) 
                    ?? <MenuItem></MenuItem>
                    }
                </TextField>
            </ConditionalTooltip>

            <MaterialList 
                materiais={entrada ? materiaisEntrada : materiais} 
                isLoading={entrada ? materiaisEntrada.isLoading : materiais.isLoading} 
                enabled={ !!selectedTipo } 
                defaultValue={defaultValue} 
                inputName={inputName}
                entrada={entrada}
            />
        </Box>);
}