import { useQuery } from "@tanstack/react-query";
import { getMatItens, getMatTipos, primeiraLetraMaiuscula } from "../../common/utils";
import { Box, CircularProgress, MenuItem, TextField, Typography } from "@mui/material";
import { useState } from "react";
import MaterialList from "./MaterialList";
import ConditionalTooltip from "../ConditionalTooltip";

export default function MateriaisBox({
    baseSelecionada = "",
    deptoSelecionado = "",
    defaultValue = [],
    update = false,
    inputName = "",
    entrada = false,
    loading = false,
    errors = {}
}) {
    const [selectedTipo, setSelectedTipo] = useState("")
    const tipos = useQuery({
        queryKey: ['tiposMats', deptoSelecionado],
        queryFn: () => getMatTipos({ depto: deptoSelecionado }),
        enabled: !!baseSelecionada || entrada
    });

    const materiais = useQuery({
        queryKey: ['matsByTipo', selectedTipo, baseSelecionada],
        queryFn: () => getMatItens(selectedTipo, true, baseSelecionada),
        enabled: !!selectedTipo && !entrada,
    })

    const materiaisEntrada = useQuery({
        queryKey: ['matsEntrada', selectedTipo, baseSelecionada],
        queryFn: () => getMatItens(selectedTipo, false, baseSelecionada),
        enabled: entrada && !!selectedTipo,
    })

    if ((baseSelecionada && tipos.isLoading) || loading) return <Box className="w-full flex justify-center"><CircularProgress size={32} /></Box>

    const noTipos = tipos?.data?.data.length == 0 ?? true;
    const getTooltipText = () => {
        if (!baseSelecionada) {
            return "Selecione uma base"
        } else if (noTipos) {
            return "Nao ha tipos cadastrados nessa base"
        }
        return ""
    }

    return (
        <Box className="grid gap-4 w-full py-4">
            <Typography className="!text-3xl !font-thin">Materiais</Typography>

            <ConditionalTooltip
                enabled={!baseSelecionada || noTipos}
                texto={getTooltipText()}
            >
                <TextField
                    select
                    label="Tipo de material"
                    value={selectedTipo}
                    onChange={(e) => setSelectedTipo(e.target.value)}
                    disabled={!baseSelecionada || noTipos}
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
                enabled={!!selectedTipo}
                defaultValue={defaultValue}
                update={update}
                inputName={inputName}
                entrada={entrada}
            />
        </Box>);
}
