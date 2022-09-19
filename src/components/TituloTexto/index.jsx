import React from 'react';
import { Typography } from '@mui/material';
import style from '../BaixaSaidaMaterial/style';

const TituloTexto = ({ titulo, texto, bulletPoint, ...props }) => (
    <Typography sx={style.textoNegrito} {...props}>
        {bulletPoint ? "•" : ""} {titulo}
        <Typography sx={style.span} component="span">
            {texto}
        </Typography>
    </Typography>
);

export default TituloTexto;