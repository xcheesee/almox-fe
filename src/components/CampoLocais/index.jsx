import React from 'react';
import { MenuItem, Box } from '@mui/material';
import Selecao from '../Selecao';
import { useAtom } from 'jotai';
import { carregandoLocaisAtom, locaisAtom } from '../../atomStore';

const CampoLocais = ({ name, label, defaultValue, ...props }) => {
    
    const [locais, _0] = useAtom(locaisAtom)
    const [carregandoLocais, _1] = useAtom(carregandoLocaisAtom)
    
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