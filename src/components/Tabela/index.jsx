import React from 'react';
import { 
    Paper, 
    TableContainer, 
    Table, 
    TableHead, 
    TableRow, 
    TableCell, 
    TableBody,
    Fade
} from '@mui/material';
import style from './style';

const Tabela = (props) => {
    const { cabecalhos, ...other } = props;

    return (
        <Fade in={true} timeout={400}>
            <TableContainer component={Paper} elevation={4}>
                <Table size="small">
                    <TableHead sx={style.tableHead}>
                        <TableRow>
                            {cabecalhos.map((cabecalho, index) => {
                                return <TableCell sx={style.tableCell} align="center" key={index}>{cabecalho}</TableCell>
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {other.children}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fade>
    );
}

export default Tabela;