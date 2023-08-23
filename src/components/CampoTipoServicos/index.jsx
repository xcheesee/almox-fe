import React, { useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { useQuery } from "@tanstack/react-query"
import { getTipoServicos } from '../../common/utils';

const CampoTipoServicos = ({
    name, 
    label, 
    defaultValue, 
    tipo_servico="", 
    getAllBases=false, 
    onChange=() => {}, 
    ...props
}) => {

    const [tipoServico, setTipoServico] = useState(0)

    const tipo_servicos = useQuery({
        queryKey: ['tipo_servicos'], 
        queryFn: () => getTipoServicos(), 
        //enabled: !(tipo_servico === ''),
        onSuccess: (res) => {
            setTipoServico(defaultValue ?? (res.length === 1 ? res[0].id : ""))}
    })


    return (
        <>
            {tipo_servicos.isFetching
                ?<TextField
                    select
                    disabled
                    SelectProps={{ value: 0}}
                >
                    <MenuItem value={0}>Carregando...</MenuItem>
                </TextField>
                :<TextField
                    select
                    SelectProps={{ 
                        value: tipoServico, 
                        onChange: (e) => {
                            onChange(e)
                            setTipoServico(e.target.value)
                        }
                    }}
                    name={name}
                    label={label}
                    id="tipo_servico"
                    disabled={tipo_servicos.isLoading}
                    fullWidth
                    required
                    {...props}
                >
                    {tipo_servicos.data.data ? tipo_servicos?.data.data
                        ?.map(tipoServico => (
                            <MenuItem key={tipoServico.id} value={tipoServico.id}>
                                {tipoServico.servico}
                            </MenuItem>
                        ))
                    : <MenuItem></MenuItem>}
                </TextField>
            }
            
        </>
        
)};

export default CampoTipoServicos;