import React from 'react';
import { 
    Paper, 
    TableContainer, 
    Table, 
    TableHead, 
    TableRow, 
    TableCell, 
    TableBody,
} from '@mui/material';

const Tabela = (props) => {
    const { cabecalhos, ...other } = props;

    return (
        <TableContainer component={Paper} elevation={4}>
            <Table size="small">
                <TableHead sx={{ background: (theme) => theme.palette.primary.main}}>
                    <TableRow>
                        {cabecalhos.map((cabecalho, index) => {
                            return <TableCell sx={{ color: (theme) => theme.palette.color.main }} align="center" key={index}>{cabecalho}</TableCell>
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {other.children}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Tabela;