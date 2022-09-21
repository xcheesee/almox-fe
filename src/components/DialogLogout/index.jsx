import React from 'react';
import { 
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material';

const DialogLogout = ({ fnLogout, openLogout, setOpenLogout }) => (
    <Dialog open={openLogout} fullWidth maxWidth="xs">
        <DialogTitle>
            Logout
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                Tem certeza que deseja sair?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button 
                onClick={ () => setOpenLogout(false) }
            >
                Não
            </Button>
            <Button 
                onClick={ () => { 
                    setOpenLogout(false); 
                    fnLogout(); 
                }}
            >
                Sim
            </Button>
        </DialogActions>
    </Dialog>
);

export default DialogLogout;