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

            <Dialog open={openAltSenha} fullWidth maxWidth="md">
                <DialogTitle>
                    <Tooltip title="Voltar">
                        <IconButton onClick={() => setOpenAltSenha(false)}>
                            <ArrowBackIosNewIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    Alterar Senha
                </DialogTitle>
                <DialogContent>
                    <Box 
                        sx={style.gridAlt}
                        component="form"
                        id="senha"
                        name="senha"
                        onSubmit={async (e) => {
                            e.preventDefault()
                            const formData = Object.fromEntries(new FormData(e.target))
                            console.log(formData)
                            //simulacao de envio
                            setCarregando(true)
                            await(new Promise((res, rej) => {
                                setTimeout(() => res('true'), 3000)
                            }))
                            //simulacao de envio
                            setOpenAltSenha(false)
                            setCarregando(false)

                        }}
                    >
                         <TextField 
                            label="Email"
                            name="email"
                            id="email"
                            required
                        />

                        <TextField 
                            label="Senha Atual"
                            name="atualPw"
                            id="atualPw"
                            required
                        />

                        <TextField 
                            label="Nova Senha"
                            name="novaPw"
                            id="novaPw"
                            required
                        />

                        <TextField
                            name="novaPwConf"
                            label="Confirmação Nova Senha"
                            id="novaPwConf"
                            required
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'space-between' , padding: "0 0 1rem 2rem"}}>
                    <Box sx={{ display: 'flex', margin: '0.5rem', gap: '1rem' }}>
                        <Button 
                            type="submit"
                            form="senha"
                            variant="contained" sx={{ gap: '0.5rem' }}
                        >
                            {carregando
                                ? <CircularProgress color="color" size="1rem" />
                                : ''
                            }
                            Salvar
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Header;