import React from 'react';
import vazio from '../common/img/vazio.png';
import ContainerPrincipal from '../components/ContainerPrincipal';
import Titulo from '../components/Titulo';
import { Box, Typography } from '@mui/material';

const Pagina404 = () => (
    <ContainerPrincipal>
        <Titulo voltaPara="/principal">
            Erro
        </Titulo>

        <Box className="flex flex-col items-center justify-center gap-4 m-8">
            <img src={vazio} alt="Imagem de página não encontrada" className="w-1/3" />

            <Typography variant="h2">
                Erro 404
            </Typography>

            <Typography variant="h4" component="p">
                Página não encontrada
            </Typography>
        </Box>
    </ContainerPrincipal>
);

export default Pagina404;