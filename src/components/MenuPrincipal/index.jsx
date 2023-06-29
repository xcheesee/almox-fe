import React, { useEffect } from 'react';
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
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import SendAndArchiveIcon from '@mui/icons-material/SendAndArchive';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Link } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { filtrosAtom, matsAtom, pageAtom, sortAtom } from '../../atomStore';
import { useState } from 'react';

const MenuPrincipal = () => {
    const setSort = useSetAtom(sortAtom)
    const setFiltros = useSetAtom(filtrosAtom)
    const setPage = useSetAtom(pageAtom)
    const setMats = useSetAtom(matsAtom)
    const perfil = localStorage.getItem('perfil')


    //reseta valores comuns relacionados ao request de tabela
    useEffect(() => {
        setSort('')
        setPage(1)
        setFiltros('')
        setMats([])
    }, [])
    
    return (
        <ContainerPrincipal>
            <Titulo>
                Menu principal
            </Titulo>
            <Box className="grid gap-6 grid-cols-6 grid-rows-2 my-8 px-10">
                <Link to="/entrada" className="col-span-2" >
                    <Button sx={style.button} variant="outlined">
                        <ArchiveIcon fontSize='large'/>
                        Entrada de materiais
                    </Button>
                </Link>
                <Link to="/inventario" className="col-span-2">
                    <Button sx={style.button} variant="outlined">
                        <InventoryIcon fontSize='large'/> 
                        Inventário
                    </Button>
                </Link>
                {perfil === "admin" || perfil === "gestao_dgpu"
                    ?<Link to="/ordemservico" className="col-span-2" >
                        <Button sx={style.button} variant="outlined">
                            <AssignmentIcon fontSize='large'/>
                            Ordem de serviço
                        </Button>
                    </Link>
                    :<></>
                }
                <Link to="/saida" className="col-span-2" >
                    <Button sx={style.button} variant="outlined">
                        <SendAndArchiveIcon fontSize='large' />
                        Saída de Materiais
                    </Button>
                </Link>
                <Link to="/transferencia" className="col-span-2" >
                    <Button sx={style.button} variant="outlined">
                        <SwapHorizIcon fontSize='large' />
                        Transferências
                    </Button>
                </Link>
                <Link to="/ocorrencia" className="col-span-2" >
                    <Button sx={style.button} variant="outlined">
                        <AssignmentLateIcon fontSize='large'/>
                        Ocorrências
                    </Button>
                </Link>
                <Link 
                    to="/historico" 
                    className={`${perfil === "admin" || perfil === "gestao_dgpu" ? "col-span-6" : "col-span-2"}`} 
                >
                    <Button sx={style.button} variant="outlined">
                        <AccessTimeIcon fontSize='large'/>
                        Histórico
                    </Button>
                </Link>
            </Box>
        </ContainerPrincipal>
    );
}

export default MenuPrincipal;