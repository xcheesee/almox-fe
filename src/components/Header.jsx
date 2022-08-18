import React from 'react';
import { 
    Box,
    Typography,
    IconButton 
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useLocation } from 'react-router-dom';

const style = {
    header: { 
        color: (theme) => theme.palette.color.bg,
        minHeight: '3.25rem'
    },
    logo: { 
        fontSize: '1.5rem',
        '&:hover': { cursor: 'pointer' } 
    }
}

const Header = () => {
    const location = useLocation();

    return (
        <Box 
            component="header" 
            className="flex items-center justify-between px-4 py-2"
            sx={style.header}
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
                                <Typography>Olá, username</Typography>
                            </Box>

                            <Link to="/">
                                <IconButton>
                                    <LogoutIcon fontSize="small" />
                                </IconButton>
                            </Link>
                        </Box>
                }
            </Box>
        </Box>
    );
}

export default Header;