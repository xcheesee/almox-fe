import React from 'react';
import { 
    Paper, 
    TableContainer, 
    Table, 
    TableHead, 
    TableRow, 
    TableCell, 
    TableBody,
    Fade,
    Collapse,
} from '@mui/material';
import style from './style';

const Tabela = (props) => {
    const { cabecalhos, carregando, ...other } = props;

    return (
        <Fade in={true} timeout={400}>
            <TableContainer component={Paper} elevation={4}>
                <Collapse in={!carregando} collapsedSize={34}>
                    <Table size="small">
                        <TableHead sx={style.tableHead}>
                            <TableRow>
                                {cabecalhos.map((cabecalho, index) => (
                                    <TableCell sx={style.tableCell} align="center" key={index}>
                                        {cabecalho}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {other.children}
                        </TableBody>
                    </Table>
                </Collapse>
            </TableContainer>
        </Fade>
    );
}

export default Tabela;