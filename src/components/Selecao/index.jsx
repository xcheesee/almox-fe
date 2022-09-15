import React from 'react';
import { FormControl, InputLabel, Select, FormHelperText } from '@mui/material';

const Selecao = (props) => {
    const {
        name,
        label,
        defaultValue,
        helperText,
        ...other
    } = props;

    return (
        <FormControl {...other}>
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Select
                labelId={`${name}-label`}
                label={label}
                name={name}
                defaultValue={defaultValue || ""}
                onChange={other.onChange}
            >
                {other.children}
            </Select>
            <FormHelperText>
                {helperText}
            </FormHelperText>
        </FormControl>
    );
}

export default Selecao;