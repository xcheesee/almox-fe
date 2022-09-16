import React from 'react';
import { 
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material';

const DialogConfirmaEdicao = ({ texto, id, openConfirmar, setOpenConfirmar, form }) => {
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
                    form={form}
                    onClick={() => setOpenConfirmar(false)}
                >
                    Sim
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogConfirmaEdicao;