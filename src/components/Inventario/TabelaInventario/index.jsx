import React from 'react';
import {
    TableRow,
    TableCell,
    IconButton,
    Tooltip
} from '@mui/material';
import Tabela from '../../Tabela';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import { primeiraLetraMaiuscula } from '../../../common/utils';

const cabecalhos = {
    "ID": "id",
    "Item": "items.nome",
    "Tipo": "tipo_items.nome",
    "Medida": "medidas.tipo",
    "Local": "locais.nome",
    "Quantidade": "quantidade",
    "Ação": null
};

const TabelaInventario = (props) => {
    const { 
        itens,
        carregando,
        cursor,
        inventarioItemDefinirAlerta,
    } = props;

    return (
        <Tabela 
            cabecalhos={cabecalhos} 
            carregando={carregando}
        >
            {itens?.map(item => (
                    <TableRow key={item.id}>
                        <TableCell align="center">{item.id}</TableCell>
                        <TableCell align="center">{item.item}</TableCell>
                        <TableCell align="center">{primeiraLetraMaiuscula(item.tipo_item)}</TableCell>
                        <TableCell align="center">{item.medida}</TableCell>
                        <TableCell align="center">{item.local}</TableCell>
                        <TableCell align="center">{item.quantidade}</TableCell>
                        <TableCell align="center">
                            <Tooltip title="Definir alerta" placement="right">
                                <IconButton 
                                    onClick={() => { inventarioItemDefinirAlerta(item.id)} }
                                    disabled={cursor === 'progress'}
                                >
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