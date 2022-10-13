import React from 'react';
import { CircularProgress } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const IconeSort = ({ sort, valor, carregando }) => {
    if (carregando)
        return (
            <CircularProgress 
                color='color'
                size='0.8rem'
                sx={{ m: '0 0.5rem' }}
            />
        );
    else if (valor === sort)
        return <ExpandMoreIcon />;
    else if (sort[0] === '-' && sort.substring(1) === valor)
        return <ExpandLessIcon />;
    else
        return <></>;
}

export default IconeSort;