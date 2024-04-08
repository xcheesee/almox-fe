import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
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

const DialogEditar = ({ 
    titulo, 
    openEditar, 
    setOpenEditar, 
    defaultValue={id: ""}, 
    setOpenConfirmar, 
    setOpenExcluir, 
    carregando, 
    ...other 
}) => {
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

    return (
        <Dialog open={openEditar} fullWidth fullScreen={fullScreen} maxWidth="md">
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
                        { carregando && <CircularProgress color="color" size="1rem" /> }
                        Editar
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
}

export default DialogEditar;