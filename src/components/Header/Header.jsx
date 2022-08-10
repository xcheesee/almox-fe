import React from 'react';
import { IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';

const Header = () => {
    return (
        <header className="bg-slate-600 flex items-center justify-between px-6 py-1 drop-shadow-xl">
            <h1 className="text-xl text-white font-light">Almoxarifado</h1>
            
            <div className="flex items-center gap-5">
                <div className="flex items-center gap-1">
                    <PersonSharpIcon className="text-white" fontSize="small"/>
                    <p className="text-white font-light">Olá, username</p>
                </div>

                <IconButton>
                    <LogoutIcon className="text-white" fontSize="small" />
                </IconButton>
            </div>
        </header>
    );
}

export default Header;