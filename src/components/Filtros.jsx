import React, { useState } from 'react';
import { IconButton, Box, Badge, Typography, Collapse, Button } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
                    sx={{ 
                        borderRadius: 1, 
                        boxSizing: 'border-box', 
                        margin: '1rem',
                        padding: '0.5rem'
                    }}
                >
                    <Badge 
                        badgeContent={filtrosAtivos.length - 1} 
                        color="primary"
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        sx={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Typography 
                            variant="h3" 
                            component="h3" 
                            sx={{ 
                                fontSize: '1.25rem', 
                                mr: '0.5rem',
                                ml: '0.5rem', 
                                display: 'flex', 
                                alignItems: 'center',
                            }}
                        >
                            Filtros
                        </Typography>
                        {
                            visibilidade
                            ? <ExpandLessIcon sx={{ mr: '0.5rem' }} />
                            : <ExpandMoreIcon sx={{ mr: '0.5rem' }} />
                        }
                    </Badge>
                </IconButton>
            </Box>

            <Collapse in={visibilidade}>
                <Box 
                    sx={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        margin: '2rem auto',
                        mt: 0,
                        padding: '2rem',
                        border: '1px solid #cdcdcd', 
                        borderRadius: '3px',
                        width: '80%'
                    }}
                >
                    <Box 
                        sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}
                        component="form"
                        id="filtros"
                        onSubmit={salvar}
                    >
                        {other.children}
                    </Box>
                    
                    <Box sx={{ alignSelf: 'end', mt: '1rem'}}>
                        <Button 
                            sx={{ mr: '1rem' }}
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