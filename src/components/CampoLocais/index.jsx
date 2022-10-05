import React from 'react';
import { MenuItem, Box } from '@mui/material';
import Selecao from '../Selecao';

const CampoLocais = ({ name, label, defaultValue, locais, carregando, ...props }) => (
    <Box>
        <Selecao
            name={name}
            label={label}
            defaultValue={defaultValue}
            disabled={carregando}
            fullWidth
            {...props}
        >
            {locais?.map(local => (
                <MenuItem key={local.id} value={local.id}>
                    {local.nome}
                </MenuItem>
            ))}
        </Selecao>
    </Box>
);

export default CampoLocais;