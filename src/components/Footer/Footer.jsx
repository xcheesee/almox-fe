import React from 'react';
import Logo from './img/Logo64_original.png';
import { Typography, Box } from '@mui/material';

const footerSx = { color: (theme) => theme.palette.color.bg };

const Footer = () => {
    return (
        <Box 
            component="footer" 
            className="flex items-center justify-center gap-2 p-1 my-1 w-fit mx-auto"
            sx={footerSx}
        >
            <Typography>
                Desenvolvido pela NDTIC – SVMA 
            </Typography>
            <img src={Logo} alt="Logo da NDTIC" width="16" className="rounded-full bg-zinc-700" />
        </Box>
    );
}

export default Footer;