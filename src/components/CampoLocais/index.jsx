import React, { useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { useQuery } from "@tanstack/react-query"
import { getLocais } from '../../common/utils';

const CampoLocais = ({ name, label, defaultValue, depto, tipo, ...props }) => {

    const [local, setLocal] = useState(0)

    const locais = useQuery({
        queryKey: ['locais', depto, tipo], 
        queryFn: () => getLocais(depto, tipo), 
        enabled: !(depto === ''),
        onSuccess: (res) => {
            setLocal(defaultValue ?? (res.length === 1 ? res[0].id : ""))}
    })


    return (
        <>
            {locais.isFetching
                ?<TextField
                    select
                    disabled
                    defaultValue={0}
                >
                    <MenuItem value={0}>Carregando...</MenuItem>
                </TextField>
                :<TextField
                    select
                    name={name}
                    label={label}
                    value={local}
                    disabled={locais.isLoading || depto === ''}
                    fullWidth
                    required
                    {...props}
                >
                    {locais?.data
                        ?.filter( local => local.tipo === tipo )
                        ?.map(local => (
                            <MenuItem key={local.id} value={local.id}>
                                {local.nome}
                            </MenuItem>
                        ))
                    }
                </TextField>
            }
            
        </>
        
)};

export default CampoLocais;