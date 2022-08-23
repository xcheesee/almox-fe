import React, { useState } from 'react';
import { IconButton, Box, Badge, Typography, Collapse, Button } from '@mui/material';
import style from './style';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TuneIcon from '@mui/icons-material/Tune';

const Filtros = (props) => {
    const {
        ...other
    } = props;

    const [visibilidade, setVisibilidade] = useState(false);
    const [filtrosAtivos, setFiltrosAtivos] = useState(['']);

    const limpar = () => {
        setVisibilidade(false);
        setFiltrosAtivos(['']);
    }

    const salvar = (e) => {
        e.preventDefault();
        const arrFiltros = [];

        const formData = new FormData(e.target);
        const inputObject = Object.fromEntries(formData);

        Object.entries(inputObject).forEach((campo) => {
            if (campo[1] !== "")
                arrFiltros.push(`[${campo[0]}]=${campo[1]}`);
        });

        setFiltrosAtivos(['', ...arrFiltros]);
        setVisibilidade(false);
    }

    return (
        <Box>
            <Box className="flex justify-end">
                <IconButton 
                    onClick={() => setVisibilidade(!visibilidade)} 
                    sx={style.iconButton}
                >
                    <Badge 
                        badgeContent={filtrosAtivos.length - 1} 
                        color="primary"
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        sx={style.badge}
                    >
                        <Typography 
                            variant="h3" 
                            component="h3" 
                            sx={style.labelBotao}
                        >
                            <TuneIcon fontSize="small" sx={style.tuneIcon} />
                            Filtros
                        </Typography>
                        {
                            visibilidade
                            ? <ExpandLessIcon fontSize="small" sx={style.expandIcon} />
                            : <ExpandMoreIcon fontSize="small" sx={style.expandIcon} />
                        }
                    </Badge>
                </IconButton>
            </Box>

            <Collapse in={visibilidade}>
                <Box 
                    sx={style.containerFiltros}
                >
                    <Box 
                        sx={style.gridFiltro}
                        component="form"
                        id="filtros"
                        onSubmit={salvar}
                    >
                        {other.children}
                    </Box>
                    
                    <Box sx={style.containerBotoes}>
                        <Button 
                            onClick={limpar}
                            type="reset"
                            form="filtros"
                        >
                            Limpar
                        </Button>
                        <Button
                            variant="contained"
                            type="submit"
                            form="filtros"
                        >
                            Salvar
                        </Button>
                    </Box>
                </Box>
            </Collapse>
        </Box>
    );
}

export default Filtros;