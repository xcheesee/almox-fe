import React from 'react';
import { TextField } from '@mui/material';
import InputMask from 'react-input-mask';

const CampoNumContrato = ({ defaultValue, ...props }) => (
    <InputMask
        mask="999/aaaa/9999"
        maskChar=" "
        defaultValue={defaultValue}
    >
        {() => 
            <TextField 
                {...props}
            />
        }
    </InputMask>
);

export default CampoNumContrato;