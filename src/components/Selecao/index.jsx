import React from 'react';
import { FormControl, InputLabel, Select } from '@mui/material';

const Selecao = (props) => {
    const {
        name,
        label,
        defaultValue,
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
        </FormControl>
    );
}

export default Selecao;