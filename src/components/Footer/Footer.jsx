import React from 'react';
import Logo from './img/Logo64_original.png';

const Footer = () => {
    return(
        <footer className="flex items-center justify-center gap-2 p-1 my-1 w-fit mx-auto bg-slate-600 rounded-md">
            <p className="font-light text-white">
                Desenvolvido pela NDTIC – SVMA 
            </p>
            <img src={Logo} alt="Logo da NDTIC" width="16" className="rounded-full" />
        </footer>
    )
}

export default Footer;