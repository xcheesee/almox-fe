import React, { useState } from 'react';
import { 
    Box,
    Typography,
    IconButton,
    Tooltip,
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button,
    TextField,
    CircularProgress,
} from '@mui/material';
import style from './style';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DialogLogout from '../DialogLogout';
import DialogAltSenh  from '../DialogAltSenh';
import { Link, resolvePath, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const [openLogout, setOpenLogout] = useState(false);

    const username = localStorage.getItem('username');
    const location = useLocation();
    const navigate = useNavigate();
    const [openAltSenha, setOpenAltSenha] = useState(false)
    const [carregando, setCarregando] = useState(false)

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('departamentos');
        localStorage.removeItem('username');
        navigate('/', { replace: true });
    }

    const showSenhaForm = () => {
        setOpenAltSenha(true)
    }

    return (
        <Box 
            className="flex items-center justify-between px-4 py-2"
            sx={style.header}
            component="header"
        >
            <Link to="/principal">
                <Typography sx={style.logo} variant="h2" component="h1">Almoxarifado</Typography>
            </Link>
            
            <Box>
                {location.pathname === '/'
                    ? 
                        ""
                    :
                        <Box className="flex items-center gap-5">
                            <Box className="flex items-center gap-1">
                                <PersonIcon fontSize="small"/>
                                <Typography>Olá, {username}</Typography>
                            </Box>

                            <Tooltip title="Alterar Senha">
                                <IconButton onClick={showSenhaForm}>
                                    <LockIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Sair">
                                <IconButton onClick={() => setOpenLogout(true)}>
                                    <LogoutIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            
                        </Box>
                }
            </Box>

            <DialogLogout 
                fnLogout={logout}
                openLogout={openLogout}
                setOpenLogout={setOpenLogout}
            />

            <DialogAltSenh
                openAltSenha={openAltSenha}
                setOpenAltSenha={setOpenAltSenha}
                carregando={carregando}
                setCarregando={setCarregando}
            />
            
        </Box>
    );
}

export default Header;