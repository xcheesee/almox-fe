import React, { useState } from 'react';
import { IconButton, Box, Badge, Typography, Collapse, Button } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Filtros = (props) => {
    const [visibilidade, setVisibilidade] = useState(false);

    return (
        <Box>
            <Box className="flex justify-end">
                <IconButton 
                    onClick={() => setVisibilidade(!visibilidade)} 
                    sx={{ 
                        borderRadius: 1, 
                        boxSizing: 'border-box', 
                        margin: '1rem',
                        textTransform: 'none',
                        padding: '0.5rem'
                    }}
                >
                    <Badge 
                        badgeContent={0} 
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
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        {props.children}
                    </Box>
                    
                    <Box sx={{ alignSelf: 'end', mt: '2rem'}}>
                        <Button 
                            sx={{ 
                                textTransform: 'none', 
                                mr: '1rem' 
                            }}
                        >
                            Limpar
                        </Button>
                        <Button
                            sx={{ textTransform: 'none' }}
                            variant="contained"
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