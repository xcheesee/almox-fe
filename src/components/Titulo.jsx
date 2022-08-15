import React from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link, useLocation } from 'react-router-dom';

const tituloSx = { fontSize: '1.75rem', color: (theme) => theme.palette.color.bg };

const BotaoVoltar = (props) => {
    return (
        <Tooltip title="Voltar">
            <Link to={props.voltaPara}>
                <IconButton>
                    <ArrowBackIosNewIcon fontSize="small" />
                </IconButton>
            </Link>
        </Tooltip>
    );
}

const Titulo = (props) => {
    const { voltaPara, ...other } = props;
    const location = useLocation();

    return (
        <Box className="flex items-center gap-2">
            { location.pathname !== '/principal' ? <BotaoVoltar voltaPara={ voltaPara ? voltaPara : "/principal" } /> : "" }
            <Typography variant="h2" component="h1" sx={tituloSx}>
                {other.children}
            </Typography>
        </Box>
    );
}

export default Titulo;