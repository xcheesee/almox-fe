import React from 'react';
import { Typography } from '@mui/material';
import style from '../BaixaSaidaMaterial/style';

const TituloTexto = ({ titulo, texto, bulletPoint, childComponent, childStyle, ...props }) => (
    <Typography sx={style.textoNegrito} {...props}>
        {bulletPoint ? "•" : ""} {titulo}
        <Typography sx={{...style.span, ...childStyle}} component={childComponent || "span"}>
            {texto}
        </Typography>
    </Typography>
);

export default TituloTexto;