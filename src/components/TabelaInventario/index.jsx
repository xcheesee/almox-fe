import React from 'react';
import {
    TableRow,
    TableCell,
    IconButton,
    Tooltip
} from '@mui/material';
import Tabela from '../Tabela';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';

const cabecalhos = [
    "ID",
    "Item",
    "Tipo",
    "Medida",
    "Local",
    "Quantidade",
    "Ação"
];

const TabelaInventario = (props) => {
    const { 
        itens,
        setIdAlerta, 
        setOpenDefinir,
    } = props;

    return (
        <Tabela cabecalhos={cabecalhos}>
            {itens.map(item => (
                    <TableRow key={item.id}>
                        <TableCell align="center">{item.id}</TableCell>
                        <TableCell align="center">{item.item_id}</TableCell>
                        <TableCell align="center">{item.tipo || "---"}</TableCell>
                        <TableCell align="center">{item.medida || "---"}</TableCell>
                        <TableCell align="center">{item.local_id}</TableCell>
                        <TableCell align="center">{item.quantidade}</TableCell>
                        <TableCell align="center">
                            <Tooltip title="Definir alerta" placement="right">
                                <IconButton onClick={() => { setOpenDefinir(true); setIdAlerta(item.id); }}>
                                    <NotificationAddIcon />
                                </IconButton>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                )
            )}
        </Tabela>
    );
}

export default TabelaInventario;