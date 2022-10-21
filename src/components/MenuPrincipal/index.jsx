import React from 'react';
import { 
    Button,
    Box 
} from '@mui/material';
import style from './style';
import ContainerPrincipal from '../ContainerPrincipal';
import Titulo from '../Titulo';
import InventoryIcon from '@mui/icons-material/Inventory';
import ArchiveIcon from '@mui/icons-material/Archive';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { filtrosAtom, pageAtom, sortAtom } from '../../atomStore';

const MenuPrincipal = () => {
    const setSort = useSetAtom(sortAtom)
    const setFiltros = useSetAtom(filtrosAtom)
    const setPage = useSetAtom(pageAtom)

    setSort('')
    setPage(1)
    setFiltros('')

    return (
        <ContainerPrincipal>
            <Titulo>
                Menu principal
            </Titulo>
            <Box className="grid gap-6 grid-cols-2 grid-rows-2 my-8 px-10">
                <Link to="/entrada" className="row-start-1 row-end-1" >
                    <Button sx={style.button} variant="outlined">
                        <ArchiveIcon className="mx-2" />
                        Entrada de material
                    </Button>
                </Link>
                <Link to="/ordemservico" className="row-start-1 row-end-1" >
                    <Button sx={style.button} variant="outlined">
                        <AssignmentIcon className="mx-2" />
                        Ordem de serviço
                    </Button>
                </Link>
                <Link to="/inventario" className="col-span-2 flex gap-2">
                    <Button sx={style.button} variant="outlined">
                        <InventoryIcon className="mx-2" /> 
                        Inventário
                    </Button>
                </Link>
            </Box>
        </ContainerPrincipal>
    );
}

export default MenuPrincipal;