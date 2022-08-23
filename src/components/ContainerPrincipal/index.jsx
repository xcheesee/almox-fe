import React from 'react';
import { Paper, Fade } from '@mui/material';
import style from './style';

const ContainerPrincipal = (props) => {
    return (
        <Fade in={true}>
            <Paper elevation={6} sx={style.paper}>
                {props.children}
            </Paper>
        </Fade>
    );
}

export default ContainerPrincipal;