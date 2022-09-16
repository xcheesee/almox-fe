import React, { useState, useEffect } from 'react';
import { MenuItem, Box } from '@mui/material';
import Selecao from '../Selecao';
import { getLocais } from '../../common/utils';

const CampoLocais = ({ name, label, defaultValue, ...props }) => {
    const [locais, setLocais] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        getLocais(setCarregando, setLocais);
    }, []);

    return (
        <Box>
            <Selecao
                name={name}
                label={label}
                defaultValue={defaultValue}
                disabled={carregando}
                fullWidth
                {...props}
            >
                {locais.map(local => (
                    <MenuItem key={local.id} value={local.id}>
                        {local.nome}
                    </MenuItem>
                ))}
            </Selecao>
        </Box>
    );
}

export default CampoLocais;