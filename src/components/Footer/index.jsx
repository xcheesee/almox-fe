import React from 'react';
import Logo from '../../common/img/Logo64_original.png';
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
            <img src={Logo} alt="Logo da NDTIC" style={{ width: '1.25rem' }} className="rounded-full" />
        </Box>
    );
}

export default Footer;