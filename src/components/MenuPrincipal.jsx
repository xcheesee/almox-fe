import React from 'react';
import { 
    Button,
    Box 
} from '@mui/material';
import ContainerPrincipal from './ContainerPrincipal';
import Titulo from './Titulo';
import InventoryIcon from '@mui/icons-material/Inventory';
import ArchiveIcon from '@mui/icons-material/Archive';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';

const buttonSx = {
    textTransform: 'none',
    fontSize: '2rem',
    fontWeight: 'light',
    padding: '2rem',
    width: '100%'
};

const MenuPrincipal = () => {
    return (
        <ContainerPrincipal>
            <Titulo>
                Menu principal
            </Titulo>
            <Box className="grid gap-6 grid-cols-2 grid-rows-2 my-8 px-10">
                <Link to="/entrada" className="row-start-1 row-end-1" >
                    <Button sx={buttonSx} variant="contained">
                        <ArchiveIcon className="mx-2" />
                        Entrada de material
                    </Button>
                </Link>
                <Link to="/ordemservico" className="row-start-1 row-end-1" >
                    <Button className="row-start-1 row-end-2" sx={buttonSx} variant="contained">
                        <AssignmentIcon className="mx-2" />
                        Ordem de serviço
                    </Button>
                </Link>
                <Button className="col-span-2 flex gap-2" sx={buttonSx} variant="contained">
                    <InventoryIcon /> 
                    Inventário
                </Button>
            </Box>
        </ContainerPrincipal>
    );
}

export default MenuPrincipal;