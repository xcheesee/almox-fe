import React from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link, useLocation } from 'react-router-dom';

const tituloSx = { fontSize: '2rem' };

const BotaoVoltar = () => {
    return (
        <Tooltip title="Voltar">
            <Link to="/principal">
                <IconButton>
                    <ArrowBackIosNewIcon />
                </IconButton>
            </Link>
        </Tooltip>
    );
}

const Titulo = (props) => {
    const { children } = props;
    const location = useLocation();

    return (
        <Box className="flex items-center gap-2">
            { location.pathname !== '/principal' ? <BotaoVoltar /> : "" }
            <Typography variant="h2" component="h1" sx={tituloSx}>
                {children}
            </Typography>
        </Box>
    );
}

export default Titulo;