import React from 'react';
import { 
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button 
} from '@mui/material';

const DialogEnviar = ({ openConfirmar, setOpenConfirmar }) => {
    return (
        <Dialog open={openConfirmar}>
            <DialogContent>
                <DialogContentText>
                    Deseja cadastrar a nova ordem de serviço?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={() => setOpenConfirmar(false)}
                >
                    Não
                </Button>
                <Button
                    type="submit" 
                    form="nova-ordem" 
                >
                    Sim
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogEnviar;