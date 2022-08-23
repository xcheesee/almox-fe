import React from 'react';
import { Paper, Fade, Box } from '@mui/material';
import style from './style';

const ContainerPrincipal = (props) => {
    return (
        <Fade in={true}>
            <Box sx={style.boxMargin}>
                <Paper elevation={6} sx={style.paper}>
                    {props.children}
                </Paper>
            </Box>
        </Fade>
    );
}

export default ContainerPrincipal;