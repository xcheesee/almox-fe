import React, { useState } from 'react';
import { 
    Box,
    Typography,
    IconButton,
    Tooltip,
} from '@mui/material';
import style from './style';
import LogoutIcon from '@mui/icons-material/Logout';
import LockIcon from '@mui/icons-material/Lock'
import MenuItemsAcabando from '../MenuItemsAcabando';
import DialogLogout from '../DialogLogout';
import DialogAltSenh  from '../DialogAltSenh';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../common/utils/hooks';

const Header = () => {
    const [openLogout, setOpenLogout] = useState(false);
    const { 
        username 
    } = useAuth()


    const location = useLocation();
    const [openAltSenha, setOpenAltSenha] = useState(false);

    const { log_out } = useAuth()

    const showSenhaForm = () => setOpenAltSenha(true)

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
                            <MenuItemsAcabando 
                                username={username}
                                style={style}
                            />

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
                fnLogout={log_out}
                openLogout={openLogout}
                setOpenLogout={setOpenLogout}
            />

            <DialogAltSenh
                openAltSenha={openAltSenha}
                setOpenAltSenha={setOpenAltSenha}
            />  
        </Box>
    );
}

export default Header;