import React from 'react';
import { Box, Typography, IconButton, Tooltip, CircularProgress } from '@mui/material';
import style from './style';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link, useLocation } from 'react-router-dom';

const BotaoVoltar = (props) => {
    const perfil = localStorage.getItem('perfil');
    const display = perfil === 'encarregado' ? 'none' : ''

    return (
        <Tooltip title="Voltar">
            <Link to={props.voltaPara}>
                <IconButton sx={{ display: display }}>
                    <ArrowBackIosNewIcon fontSize="small" />
                </IconButton>
            </Link>
        </Tooltip>
    );
}

const Titulo = (props) => {
    const { voltaPara, carregando, ...other } = props;
    const location = useLocation();

    return (
        <Box className="flex items-center gap-2">
            { 
                location.pathname !== '/' && location.pathname !== '/principal' 
                ? <BotaoVoltar voltaPara={ voltaPara ? voltaPara : "/principal" } /> 
                : "" 
            }
            <Typography variant="h2" component="h1" sx={style.titulo}>
                {other.children}
                {
                    carregando
                    ? <CircularProgress size='1rem' />
                    : ''
                }
            </Typography>
        </Box>
    );
}

export default Titulo;