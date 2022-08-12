import React from 'react';
import { 
    TableRow, 
    TableCell, 
    IconButton,
    Tooltip
} from '@mui/material';
import Tabela from './Tabela';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import EditIcon from '@mui/icons-material/Edit';

const cabecalhos = [
    "ID",
    "Data",
    "Processo SEI",
    "Contrato",
    "Local",
    "Nota Fiscal",
    "Ação",
];

const entradas = [
    {id: 1, data: "2022-08-15 14:09", processo_sei: "1234202212345678", contrato: "001SVMA2022", local: "Base Leolpoldina", nota_fiscal: "12341234123"},
    {id: 2, data: "2022-07-20 16:16", processo_sei: "4321202276543210", contrato: "002SVMA2022", local: "Base Leolpoldina", nota_fiscal: "43214321432"},
    {id: 3, data: "2022-02-13 18:32", processo_sei: "6000202276541239", contrato: "003SVMA2022", local: "Base Leolpoldina", nota_fiscal: "12346784466"},
    {id: 4, data: "2022-04-17 10:35", processo_sei: "6066202264315275", contrato: "004SVMA2022", local: "Base Leolpoldina", nota_fiscal: "13456789578"},
    {id: 5, data: "2022-09-01 12:21", processo_sei: "6123202294632157", contrato: "005SVMA2022", local: "Base Leolpoldina", nota_fiscal: "76453145692"},
];

const TabelaEntrada = () => {
    return (
        <Tabela cabecalhos={cabecalhos}>
            {entradas.map((entrada, index) => {
                return (
                    <TableRow key={index}>
                        <TableCell align="center">{entrada.id}</TableCell>
                        <TableCell align="center">{entrada.data}</TableCell>
                        <TableCell align="center">{entrada.processo_sei}</TableCell>
                        <TableCell align="center">{entrada.contrato}</TableCell>
                        <TableCell align="center">{entrada.local}</TableCell>
                        <TableCell align="center">{entrada.nota_fiscal}</TableCell>
                        <TableCell align="center">
                            <Tooltip title="Visualizar" placement="left">
                                <IconButton>
                                    <ManageSearchIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Editar" placement="right">
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                );
            })}
        </Tabela>
    );
}

export default TabelaEntrada;