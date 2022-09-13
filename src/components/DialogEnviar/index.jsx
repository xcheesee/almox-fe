import React from 'react';
import { 
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button 
} from '@mui/material';

const DialogEnviar = ({ openConfirmar, setOpenConfirmar, texto, form }) => {
    return (
        <Dialog open={openConfirmar}>
            <DialogContent>
                <DialogContentText>
                    Deseja cadastrar a nova {texto}?
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
                    form={form}
                >
                    Sim
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogEnviar;