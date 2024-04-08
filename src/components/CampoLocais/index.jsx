import { MenuItem, TextField } from '@mui/material';
import { useQuery } from "@tanstack/react-query"
import { getLocais } from '../../common/utils';
import React, { useState } from 'react';

const CampoLocais = React.forwardRef(({
        name, 
        label, 
        defaultValue=null, 
        value=null,
        tipo, 
        depto="", 
        getAllBases=false, 
        disabled=false,
        onChange=() => {}, 
        onLocaisQuery=() => {},
        ...other
    }, 
    ref
    ) => {
    const [filteredLocais, setFilteredLocais] = useState([])
    const [dftVal, setDftVal] = useState(defaultValue ?? "")
    const locais = useQuery({
        queryKey: ['locais', depto, tipo], 
        queryFn: () => getLocais(depto, tipo), 
        enabled: !!depto,
        onSuccess: (res) => {
            onLocaisQuery(res, defaultValue) 
            setFilteredLocais(res?.filter( local => local.tipo === tipo ))
        }
    })

    if(locais.isFetching) return (
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

    if(value === null) return (
        <TextField
            select
            value={dftVal}
            onChange={(e) => {
                setDftVal(e.target.value)
                onChange(e)
            }}
            name={name}
            label={label}
            disabled={disabled}
            fullWidth
            required
            ref={ref}
            {...other}
        >
            {filteredLocais?.map((local, i) => (
                    <MenuItem value={local.id} key={`local-${i}`}>
                        {local.nome}
                    </MenuItem>
                ))
            ?? <MenuItem></MenuItem>}
        </TextField>
    );


    return (
        <TextField
            select
            onChange={onChange}
            value={value}
            name={name}
            label={label}
            disabled={disabled}
            fullWidth
            required
            ref={ref}
            {...other}
        >
            {filteredLocais?.map(local => (
                <MenuItem key={local.id} value={local.id}>
                    {local.nome}
                </MenuItem>
                ))
            ?? <MenuItem></MenuItem>}
        </TextField>
)});

export default CampoLocais;