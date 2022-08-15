import React from 'react';
import { 
    Box,
    Typography,
    IconButton 
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';

const headerSx = { fontSize: '1.5rem', color: (theme) => theme.palette.color.bg };
const logoSx = { fontSize: '1.5rem', '&:hover': { cursor: 'pointer' } }

const Header = () => {
    return (
        <Box 
            component="header" 
            className="flex items-center justify-between px-4 py-2"
            sx={headerSx}
        >
            <Link to="/principal">
                <Typography sx={logoSx} variant="h2" component="h1">Almoxarifado</Typography>
            </Link>
            
            <Box className="flex items-center gap-5">
                <Box className="flex items-center gap-1">
                    <PersonIcon fontSize="small"/>
                    <Typography>Olá, username</Typography>
                </Box>

                <IconButton>
                    <LogoutIcon fontSize="small" />
                </IconButton>
            </Box>
        </Box>
    );
}

export default Header;