import React from 'react';
import { MenuItem, Box } from '@mui/material';
import Selecao from '../Selecao';
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getLocais } from '../../common/utils';

const CampoLocais = ({ name, label, defaultValue, ...props }) => {
    const queryClient = useQueryClient()
    const locais = useQuery(['locais'], getLocais, {
        staleTime: 120000,
        cacheTime: 120000,
    })
    
    return (
    <Box>
        <Selecao
            name={name}
            label={label}
            defaultValue={defaultValue}
            carregando={locais.isLoading}
            fullWidth
            {...props}
        >
            {locais?.data?.map(local => (
                <MenuItem key={local.id} value={local.id}>
                    {local.nome}
                </MenuItem>
            ))}
        </Selecao>
    </Box>
)};

export default CampoLocais;