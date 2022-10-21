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
    Box,
} from '@mui/material';
import IconeSort from '../IconeSort';
import style from './style';
import { useAtom } from 'jotai';
import { sortAtom } from '../../atomStore';

const Tabela = (props) => {
    const { cabecalhos, carregando, ...other } = props;
    
    const [sort, setSort] = useAtom(sortAtom)

    const handleClickSort = (valor) => {

        if (valor !== null) {
            sort === valor && valor !== null
            ? setSort(`-${valor}`)
            : setSort(valor)
        }
    }

    return (
        <Fade in={true} timeout={400}>
            <TableContainer component={Paper} elevation={4}>
                <Collapse in={!carregando} collapsedSize={34}>
                    <Table size="small">
                        <TableHead sx={style.tableHead}>
                            <TableRow>
                                {Object.entries(cabecalhos).map((cabecalho, index) => {
                                    const chave = cabecalho[0];
                                    const valor = cabecalho[1];

                                    return (
                                        <TableCell 
                                            sx={style.tableCell} 
                                            align="center" 
                                            key={index}
                                            onClick={() => handleClickSort(valor)}
                                        >
                                            <Box
                                                sx={{
                                                    ...style.boxTableCell,
                                                    '&:hover': {
                                                        cursor: valor ? 'pointer' : 'auto',
                                                        fontWeight: valor ? 'bold' : 'auto',
                                                        background: valor ? 'rgba(50, 50, 50, 0.2)' : 'none',
                                                        transition: '0.2s'
                                                    }
                                                }}
                                            >
                                                {chave}
    
                                                <IconeSort
                                                    sort={sort}
                                                    valor={valor}
                                                    carregando={valor ? carregando : false}
                                                />
                                            </Box>
                                        </TableCell>
                                    )
                                })}
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