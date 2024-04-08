import React from 'react';
import { Box } from '@mui/material';

const FormContainer = (props) => {
    const { 
        id, 
        onSubmit, 
        children, 
    } = props;

    return (
        <Box
            className="flex flex-col gap-10 py-2 px-4 mt-4"
        >
            <Box
                component="form" 
                onSubmit={onSubmit}
                id={id}
                className="flex flex-col gap-10"
                encType="multipart/form-data"
            >
                {children}
            </Box>
        </Box>
    );
}

export default FormContainer;