import React from 'react';
import { 
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';

const DialogEditar = ({ titulo, openEditar, setOpenEditar, ...other }) => {
    return (
        <Dialog open={openEditar} fullWidth maxWidth="md">
            <DialogTitle>{titulo}</DialogTitle>
            <DialogContent>
                {other.children}
            </DialogContent>
            <DialogActions sx={{ margin: '0.5rem', gap: '1rem' }}>
                <Button onClick={ () => setOpenEditar(false) }>
                    Cancelar
                </Button>
                <Button variant="contained">
                    Editar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogEditar;