import React from 'react';
import { 
    TableRow, 
    TableCell
} from '@mui/material';
import Tabela from './Tabela';

const cabecalhos = [
    "ID",
    "Item",
    "Tipo",
    "Medida",
    "Local",
    "Quantidade"
];

const entradas = [
    {
        id: 1, 
        item: "Adaptador de PVC rígido soldável, longo, com flange, 25 mm x 3/4\"", 
        tipo: "Hidráulica", 
        medida: "Pç", 
        local: "Base Leopoldina", 
        quantidade: "500"
    },
    {
        id: 2, 
        item: "Adaptador PVC Sold. c/ Flange p/ Cx. D'água. Diam. 32mm, marrom", 
        tipo: "Hidráulica", 
        medida: "Pç", 
        local: "Base Leopoldina", 
        quantidade: "300"
    },
    {
        id: 3, 
        item: "Sarrafo \"2,5 x 5\" cm em Pinus; mista ou equivalente da região - Bruta", 
        tipo: "Carpintaria", 
        medida: "M", 
        local: "Base Leopoldina", 
        quantidade: "3000"
    },
];

const TabelaInventario = () => {
    return (
        <Tabela cabecalhos={cabecalhos}>
            {entradas.map((entrada, index) => {
                return (
                    <TableRow key={index}>
                        <TableCell align="center">{entrada.id}</TableCell>
                        <TableCell align="center">{entrada.item}</TableCell>
                        <TableCell align="center">{entrada.tipo}</TableCell>
                        <TableCell align="center">{entrada.medida}</TableCell>
                        <TableCell align="center">{entrada.local}</TableCell>
                        <TableCell align="center">{entrada.quantidade}</TableCell>
                    </TableRow>
                );
            })}
        </Tabela>
    );
}

export default TabelaInventario;