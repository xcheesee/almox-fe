import React from 'react';
import {
    TableRow,
    TableCell,
    IconButton,
    Tooltip
} from '@mui/material';
import Tabela from '../Tabela';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import EditIcon from '@mui/icons-material/Edit';
import GradingIcon from '@mui/icons-material/Grading';
import { Link } from 'react-router-dom';

const cabecalhos = [
    "ID",
    "Data serviço",
    "Base origem",
    "Base destino",
    "Local serviço",
    "Ação"
];

const TabelaOrdem = ({ ordens }) => {
    return (
        <Tabela cabecalhos={cabecalhos}>
            {ordens.map(ordem => (
                    <TableRow key={ordem.id}>
                        <TableCell align="center">{ordem.id}</TableCell>
                        <TableCell align="center">{ordem.data_servico}</TableCell>
                        <TableCell align="center">{ordem.origem}</TableCell>
                        <TableCell align="center">{ordem.destino}</TableCell>
                        <TableCell align="center">{ordem.local_servico}</TableCell>
                        <TableCell align="center">
                            <Tooltip title="Visualizar" placement="left">
                                <IconButton>
                                    <ManageSearchIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Editar" placement="top">
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Baixa" placement="right">
                                <Link to={`/ordemservico/baixa/${ordem.id}`}>
                                    <IconButton>
                                        <GradingIcon />
                                    </IconButton>
                                </Link>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                )
            )}
        </Tabela>
    );
}

export default TabelaOrdem;