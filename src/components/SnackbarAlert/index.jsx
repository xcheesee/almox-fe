import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackbarAlert = ({ snackbar, setSnackbar }) => {
    const handleClose = (e, reason) => {
        if (reason === 'clickaway')
            return;

        setSnackbar({ ...snackbar, open: false });
    }

    return (
        <Snackbar 
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleClose}    
        >
            <Alert
                onClose={handleClose}
                severity={snackbar.severity}
                variant="filled"
            >
                {snackbar.message}
            </Alert>
        </Snackbar>
    );
}

export default SnackbarAlert;