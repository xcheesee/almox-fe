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

const entradas = [
    { id: 1, data_servico: "2022-04-12", base_origem: "Leopoldina", base_destino: "Ibirapuera", local_servico: "Pq Ibirapuera" },
    { id: 2, data_servico: "2022-05-02", base_origem: "Leopoldina", base_destino: "Leopoldina", local_servico: "Pq Leopoldina - Orlando Vilas Boas" },
    { id: 3, data_servico: "2022-02-07", base_origem: "Leopoldina", base_destino: "Ibirapuera", local_servico: "Pq Ibirapuera" },
    { id: 4, data_servico: "2022-07-21", base_origem: "Leopoldina", base_destino: "Jaraguá", local_servico: "Pq Anhanguera" },
    { id: 5, data_servico: "2022-07-27", base_origem: "Leopoldina", base_destino: "Leopoldina", local_servico: "Pq Trianon" },
];

const TabelaOrdem = () => {
    return (
        <Tabela cabecalhos={cabecalhos}>
            {entradas.map((entrada, index) => {
                return (
                    <TableRow key={index}>
                        <TableCell align="center">{entrada.id}</TableCell>
                        <TableCell align="center">{entrada.data_servico}</TableCell>
                        <TableCell align="center">{entrada.base_origem}</TableCell>
                        <TableCell align="center">{entrada.base_destino}</TableCell>
                        <TableCell align="center">{entrada.local_servico}</TableCell>
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
                                <Link to={`/ordemservico/baixa/${entrada.id}`}>
                                    <IconButton>
                                        <GradingIcon />
                                    </IconButton>
                                </Link>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                );
            })}
        </Tabela>
    );
}

export default TabelaOrdem;