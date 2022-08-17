import React from 'react';
import { Box } from '@mui/material';

const FormContainer = (props) => {
    const { 
        id, 
        onSubmit, 
        ...other 
    } = props;

    return (
        <Box
            elevation={3} 
            className="flex flex-col gap-10 p-8 mt-4"
        >
            <Box
                component="form" 
                onSubmit={onSubmit}
                id={id}
                className="flex flex-col gap-10"
            >
                {other.children}
            </Box>
        </Box>
    );
}

export default FormContainer;