import React from 'react';
import { MenuItem, Box } from '@mui/material';
import Selecao from '../Selecao';
import { useAtomValue } from 'jotai';
import { carregandoLocaisAtom, locaisAtom } from '../../atomStore';

const CampoLocais = ({ name, label, defaultValue, ...props }) => {
    
    const locais = useAtomValue(locaisAtom)
    const carregandoLocais = useAtomValue(carregandoLocaisAtom)
    
    return (
    <Box>
        <Selecao
            name={name}
            label={label}
            defaultValue={defaultValue}
            disabled={carregandoLocais}
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
)};

export default CampoLocais;