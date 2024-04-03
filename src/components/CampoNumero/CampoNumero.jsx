import { TextField } from '@mui/material';
import InputMask from 'react-input-mask';

export default function CampoNumero({
    mask,
    maskChar,
    defaultValue=null,
    value="",
    onChange=() => {},
    ...other
}) {
    if(defaultValue !== null) {
        return (
             <InputMask
                 mask={mask}
                 maskChar={maskChar}
                 defaultValue={defaultValue}
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

   return (
        <InputMask
            mask={mask}
            maskChar={maskChar}
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