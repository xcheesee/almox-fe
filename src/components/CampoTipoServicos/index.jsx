import React, { useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { useQuery } from "@tanstack/react-query"
import { getTipoServicos } from '../../common/utils';

const CampoTipoServicos = ({
    name, 
    id,
    label, 
    defaultValue="", 
    deptoSelecionado,
    ...props
}) => {

    const [tipoServico, setTipoServico] = useState(defaultValue)
    
    const tipo_servicos = useQuery({
        queryKey: ['tipo_servicos', deptoSelecionado], 
        queryFn: () => getTipoServicos({depto: deptoSelecionado}), 
        //reseta o valor do tipo de servico caso ocorra mudanca do departamento selecionado
        onSuccess: () => { setTipoServico(defaultValue ?? "") } 
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
                        onChange: (e) => { setTipoServico(e.target.value) }
                    }}
                    name={name}
                    label={label}
                    id={id}
                    disabled={!deptoSelecionado || tipo_servicos.isLoading}
                    fullWidth
                    required
                    {...props}
                >
                    {tipo_servicos?.data?.servicos 
                        ?  tipo_servicos?.data.servicos
                            ?.map(tipoServico => (
                                <MenuItem key={tipoServico.id} value={tipoServico.id}>
                                    {tipoServico.servico}
                                </MenuItem>
                            ))
                        : <MenuItem></MenuItem>
                    }
                </TextField>
            }
        </>
)};

export default CampoTipoServicos;