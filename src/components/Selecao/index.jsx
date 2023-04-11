import React from 'react';
import { FormControl, InputLabel, Select, FormHelperText } from '@mui/material';

const Selecao = React.forwardRef(function Selecao(props, ref) {
    const {
        name,
        label,
        defaultValue,
        helperText,
        carregando = false,
        value,
        disabled,
        className,
        ...other
    } = props;

    return (
        <FormControl {...other} >
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Select
                ref={ref}
                labelId={`${name}-label`}
                label={label}
                name={name}
                defaultValue={defaultValue || ""}
                value={value}
                disabled={carregando || disabled}
                onChange={other.onChange}
                className={className}
            >
                {other.children}
            </Select>
            <FormHelperText>
                {helperText}
            </FormHelperText>
        </FormControl>
    );
});

export default Selecao;
