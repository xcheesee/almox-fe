import React from 'react';
import { 
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    CircularProgress,
    Box,
    Tooltip
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useIsFetching } from '@tanstack/react-query';

const DialogEditar = ({ titulo, openEditar, setOpenEditar, defaultValue, setOpenConfirmar, setOpenExcluir, ...other }) => {
    const numDeEntradaFetch = useIsFetching(['entradaItens'])

    return (
        <Dialog open={openEditar} fullWidth maxWidth="md">
            <DialogTitle>{titulo} #{defaultValue.id}</DialogTitle>
            <DialogContent>
                {other.children}
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-between' }}>
                <Tooltip title={`Excluir`} placement="right">
                    <Button 
                        variant="contained" 
                        color="alert" 
                        sx={{ margin: '0.5rem' }}
                        onClick={() => setOpenExcluir(true)}
                    >
                        <DeleteForeverIcon color="color" />
                    </Button>
                </Tooltip>

                <Box sx={{ display: 'flex', margin: '0.5rem', gap: '1rem' }}>
                    <Button onClick={ () => setOpenEditar(false) }>
                        Cancelar
                    </Button>
                    <Button 
                        variant="contained" sx={{ gap: '0.5rem' }}
                        onClick={() => setOpenConfirmar(true)}
                    >
                        {numDeEntradaFetch != 0
                            ? <CircularProgress color="color" size="1rem" />
                            : ''
                        }
                        Editar
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
}

export default DialogEditar;