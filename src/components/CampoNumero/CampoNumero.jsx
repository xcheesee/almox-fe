import { TextField } from '@mui/material';
import InputMask from 'react-input-mask';

export default function CampoNumero({
    mask,
    maskChar,
    defaultValue="",
    value="",
    onChange=() => {},
    ...other
}) {
   return (
        <InputMask
            mask={mask}
            maskChar={maskChar}
            defaultValue={defaultValue}
            value={value}
            onChange={onChange}
            {...other}
        >
            {(inputProps) => 
                <TextField 
                    {...inputProps}
                />
            }
        </InputMask>
   ) 
}