import React from 'react';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

const BotaoNovo = ({ caminho, display, ...props }) => {
    return (
        <Box sx={{ display: display }} className="justify-end pt-8">
            <Link to={caminho}>
                <Button variant="contained">
                    <AddIcon className="mr-1" size="small" />
                    {props.children}
                </Button>
            </Link>
        </Box>
    );
}

export default BotaoNovo;