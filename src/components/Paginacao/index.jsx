import React from 'react';
import { Pagination, Box } from '@mui/material';
import { pageAtom } from '../../atomStore';
import { useAtom } from 'jotai';

const Paginacao = ({ count }) => {
    const [page, setPage] = useAtom(pageAtom)
    const handleChange = (e, value) => {
        setPage(value);
    }

    return (
        <Box className="flex justify-center my-4 pt-8">
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