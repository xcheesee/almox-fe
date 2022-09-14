import React from 'react';
import { 
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button 
} from '@mui/material';
import { excluiRegistro, primeiraLetraMaiuscula } from '../../common/utils';

const DialogExcluir = ({ rota, texto, id, openExcluir, setOpenExcluir, setOpenEditar, setCarregando, setSnackbar }) => {
    return (
        <Dialog open={openExcluir}>
            <DialogContent>
                <DialogContentText>
                    Deseja realmente excluir a <strong>{texto} #{id}</strong>?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenExcluir(false)}>
                    Não
                </Button>
                <Button onClick={() => excluiRegistro(rota, id, setOpenExcluir, setOpenEditar, setCarregando, setSnackbar, primeiraLetraMaiuscula(texto))}>
                    Sim
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogExcluir;