import React from 'react';
import { TextField } from '@mui/material';
import InputMask from 'react-input-mask';

const CampoProcessoSei = ({ defaultValue, ...props }) => (
    <InputMask
        mask="9999.9999/9999999-9"
        maskChar=" "
        defaultValue={defaultValue}
        {...props}
    >
        {(inputProps) => 
            <TextField 
                {...inputProps}
            />
        }
    </InputMask>
);

export default CampoProcessoSei;