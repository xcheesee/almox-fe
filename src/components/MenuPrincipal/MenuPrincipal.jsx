import React from 'react';
import { 
    Paper, 
    Button, 
    Typography, 
    Box 
} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import ArchiveIcon from '@mui/icons-material/Archive';
import AssignmentIcon from '@mui/icons-material/Assignment';

const paperSx = { 
    maxWidth: '80rem', 
    width: '100%',
    padding: '1rem',
    margin: 'auto',
    backgroundColor: 'rgba(255,255,255,0.8)'
};

const tituloSx = { fontSize: '2rem' };

const buttonSx = {
    textTransform: 'none',
    fontSize: '2rem',
    fontWeight: 'light',
    padding: '2rem'
};


const MenuPrincipal = () => {
    return (
        <Paper elevation={6} sx={paperSx}>
            <Typography variant="h2" component="h1" sx={tituloSx}>
                Menu principal
            </Typography>
            <Box className="grid gap-6 grid-cols-2 grid-rows-2 my-8 px-10">
                <Button className="row-start-1 row-end-1" sx={buttonSx} variant="contained">
                    <ArchiveIcon className="mx-2" />
                    Entrada de material
                </Button>
                <Button className="row-start-1 row-end-2" sx={buttonSx} variant="contained">
                    <AssignmentIcon className="mx-2" />
                    Ordem de serviço
                </Button>
                <Button className="col-span-2 flex gap-2" sx={buttonSx} variant="contained">
                    <InventoryIcon /> 
                    Inventário
                </Button>
            </Box>
        </Paper>
    );
}

export default MenuPrincipal;