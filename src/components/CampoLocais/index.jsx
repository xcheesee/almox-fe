import React from 'react';
import { MenuItem, Box } from '@mui/material';
import Selecao from '../Selecao';
import { useQuery } from "@tanstack/react-query"
import { getLocais } from '../../common/utils';

const CampoLocais = ({ name, label, defaultValue, depto, tipo, ...props }) => {
    const locais = useQuery(['locais', depto, tipo], () => getLocais(depto, tipo))
    
    return (
    <Box>
        <Selecao
            name={name}
            label={label}
            defaultValue={defaultValue}
            carregando={locais.isLoading || depto === ''}
            fullWidth
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
        </Selecao>
    </Box>
)};

export default CampoLocais;