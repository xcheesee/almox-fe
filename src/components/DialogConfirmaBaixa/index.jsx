import React from 'react';
import { 
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material';

const DialogConfirmaBaixa = ({ openBaixa, setOpenBaixa, id, enviaBaixa }) => (
    <Dialog open={openBaixa}>
        <DialogContent>
            <DialogContentText>
                Tem certeza que deseja enviar a baixa da ordem de serviço <strong>#{id}</strong>?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpenBaixa(false)}>
                Não
            </Button>
            <Button onClick={enviaBaixa}>
                Sim
            </Button>
        </DialogActions>
    </Dialog>
)

export default DialogConfirmaBaixa;