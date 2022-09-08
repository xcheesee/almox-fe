import React from 'react';
import { 
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material';

const DialogConfirmaEdicao = ({ texto, id, openConfirmar, setOpenConfirmar }) => {
    return (
        <Dialog open={openConfirmar}>
            <DialogContent>
                <DialogContentText>
                    Confirma a edição da <strong>{texto} #{id}</strong>?
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

export default DialogConfirmaEdicao;