import React from 'react';
import { 
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button 
} from '@mui/material';
import { excluiRegistro, primeiraLetraMaiuscula } from '../../common/utils';
import { useAtom } from 'jotai';
import { excluirAtom, snackbarAtom } from '../../atomStore';

const DialogExcluir = ({ rota, texto, id, setOpenEditar, setCarregando, setHouveMudanca }) => {
    const [snackbar, setSnackbar] = useAtom(snackbarAtom)
    const [openExcluir, setOpenExcluir] = useAtom(excluirAtom)
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
                <Button onClick={() => excluiRegistro(rota, id, setHouveMudanca, setOpenExcluir, setOpenEditar, setCarregando, setSnackbar, primeiraLetraMaiuscula(texto))}>
                    Sim
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogExcluir;