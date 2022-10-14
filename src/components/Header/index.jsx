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

const Header = ({ itemsAcabando }) => {
    const [openLogout, setOpenLogout] = useState(false);

    const username = localStorage.getItem('username');
    const location = useLocation();
    const navigate = useNavigate();
    const [openAltSenha, setOpenAltSenha] = useState(false);
    const [carregando, setCarregando] = useState(false);

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('departamentos');
        localStorage.removeItem('username');
        localStorage.removeItem('usermail')
        navigate('/', { replace: true });
    }

    const showSenhaForm = () => setOpenAltSenha(true)

    const newPwRequest = async (formData) => {
        const url = new URL(
            `${process.env.REACT_APP_API_URL}/alterar_senha`
        );
        
        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": localStorage.getItem('access_token'),
        };
        const data = {...formData, email: localStorage.getItem('usermail')}

        const res = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
        })
        
        return await res.json()
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
                            <MenuItemsAcabando 
                                username={username}
                                style={style}
                                itemsAcabando={itemsAcabando}
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
                fnLogout={logout}
                openLogout={openLogout}
                setOpenLogout={setOpenLogout}
            />

            <DialogAltSenh
                openAltSenha={openAltSenha}
                setOpenAltSenha={setOpenAltSenha}
                carregando={carregando}
                setCarregando={setCarregando}
                pwRequest={newPwRequest}
            />  
        </Box>
    );
}

export default Header;