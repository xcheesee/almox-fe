import React from 'react';
import { Pagination, Box } from '@mui/material';

const Paginacao = ({ page, setPage, count }) => {
    const handleChange = (e, value) => {
        setPage(value);
    }

    return (
        <Box className="flex justify-center my-4">
            <Pagination 
                shape="rounded" 
                color="primary"
                onChange={handleChange}
                count={count} 
                page={page}
            />
        </Box>
    );
}

export default Paginacao;