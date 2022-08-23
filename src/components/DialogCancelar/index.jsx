import React from 'react';
import { 
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button 
} from '@mui/material';
import { useNavigate } from 'react-router';

const DialogCancelar = (props) => {
    const { 
        paginaAnterior,
        rota,
        openCancelar,
        setOpenCancelar
    } = props;
    const navigate = useNavigate();

    const nao = () => {
        setOpenCancelar(false);
    }

    const sim = (rota) => {
        navigate(rota, { replace: true });
    }

    return (
        <Dialog open={openCancelar}>
            <DialogContent>
                <DialogContentText>
                    Deseja descartar os dados e voltar à página de {`${paginaAnterior}`}?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={nao}>Não</Button>
                <Button onClick={() => sim(rota)}>Sim</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogCancelar;