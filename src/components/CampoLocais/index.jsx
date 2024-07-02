import { MenuItem, TextField } from '@mui/material';
import { useQuery } from "@tanstack/react-query"
import { getLocais } from '../../common/utils';
import React, { useState } from 'react';
import ConditionalTooltip from '../ConditionalTooltip';

const CampoLocais = React.forwardRef(({
    name,
    label,
    defaultValue = null,
    value = null,
    tipo = "",
    depto = "",
    getAll = false,
    disabled = false,
    onChange = () => { },
    onLocaisQuery = () => { },
    restrito = false,
    required = false,
    ...other
},
    ref
) => {
    //const [filteredLocais, setFilteredLocais] = useState([])
    const [dftVal, setDftVal] = useState(defaultValue ?? "")
    const locais = useQuery({
        queryKey: ['locais', depto, tipo, restrito],
        queryFn: () => getLocais(depto, tipo, restrito),
        enabled: !!depto || getAll,
        onSuccess: (res) => {
            onLocaisQuery(res, defaultValue)
            //setFilteredLocais(res?.filter( local => local.tipo === tipo ))
        }
    })
    const noLocais = locais?.data?.length == 0 ?? true;

    const getTooltipText = () => {
        if (!depto && !getAll) {
            return "Selecione um departamento!"
        } else if (noLocais) {
            return "Nenhum departamento encontrado!"
        }
    }

    if (locais.isFetching) return (
        <TextField
            select
            value={0}
            disabled
            ref={ref}
            {...other}
        >
            <MenuItem value={0}>Carregando...</MenuItem>
        </TextField>
    );

    if (value === null) return (

        <ConditionalTooltip
            enabled={(!depto && !getAll) || noLocais}
            texto={getTooltipText()}
        >
            <TextField
                select
                value={dftVal}
                onChange={(e) => {
                    setDftVal(e.target.value)
                    onChange(e)
                }}
                name={name}
                label={label}
                disabled={disabled || noLocais}
                fullWidth
                required={required}
                ref={ref}
                {...other}
            >
                {locais?.data?.map((local, i) => (
                    <MenuItem value={local.id} key={`local-${i}`}>
                        {local.nome}
                    </MenuItem>
                ))
                    ?? <MenuItem></MenuItem>}
            </TextField>
        </ConditionalTooltip>
    );


    return (
        <ConditionalTooltip
            enabled={!depto || noLocais}
            texto={getTooltipText()}
        >
            <TextField
                select
                onChange={onChange}
                value={value}
                name={name}
                label={label}
                disabled={disabled || noLocais}
                fullWidth
                required={required}
                ref={ref}
                {...other}
            >
                {locais?.data?.map(local => (
                    <MenuItem key={local.id} value={local.id}>
                        {local.nome}
                    </MenuItem>
                ))
                    ?? <MenuItem></MenuItem>}
            </TextField>
        </ConditionalTooltip>
    )
});

export default CampoLocais;
