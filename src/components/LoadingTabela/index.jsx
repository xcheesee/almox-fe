import React from 'react';
import { Fade, Paper, CircularProgress } from '@mui/material';
import style from './style';

const LoadingTabela = ({ carregando, ...other }) => {
    if (carregando) {
        return (
            <Fade in={carregando}>
                <Paper sx={style.loading}>
                    <CircularProgress />
                </Paper>
            </Fade>
        );
    }

    return other.children;
}

export default LoadingTabela;