import React from 'react';
import { Paper, Fade } from '@mui/material';

const paperSx = { 
    maxWidth: '80rem', 
    width: '100%',
    padding: '1rem',
    margin: '2rem auto'
};

const ContainerPrincipal = (props) => {
    return (
        <Fade in={true}>
            <Paper elevation={6} sx={paperSx}>
                {props.children}
            </Paper>
        </Fade>
    );
}

export default ContainerPrincipal;