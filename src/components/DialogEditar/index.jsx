import React from 'react';
import { 
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    CircularProgress
} from '@mui/material';

const DialogEditar = ({ titulo, openEditar, setOpenEditar, carregando, defaultValue, setOpenConfirmar, ...other }) => {
    return (
        <Dialog open={openEditar} fullWidth maxWidth="md">
            <DialogTitle>{titulo} #{defaultValue.id}</DialogTitle>
            <DialogContent>
                {other.children}
            </DialogContent>
            <DialogActions sx={{ margin: '0.5rem', gap: '1rem' }}>
                <Button onClick={ () => setOpenEditar(false) }>
                    Cancelar
                </Button>
                <Button 
                    variant="contained" sx={{ gap: '0.5rem' }}
                    onClick={() => setOpenConfirmar(true)}
                >
                    {carregando
                        ? <CircularProgress color="color" size="1rem" />
                        : ''
                    }
                    Editar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogEditar;