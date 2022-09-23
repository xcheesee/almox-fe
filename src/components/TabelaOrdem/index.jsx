import React from 'react';
import {
    TableRow,
    TableCell,
    IconButton,
    Tooltip
} from '@mui/material';
import Tabela from '../Tabela';
import { getRegistro } from '../../common/utils';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import EditIcon from '@mui/icons-material/Edit';
import GradingIcon from '@mui/icons-material/Grading';
import { Link } from 'react-router-dom';

const cabecalhos = [
    "ID",
    "Data de início do serviço",
    "Data de fim do serviço",
    "Base origem",
    "Local serviço",
    "Ação"
];

const TabelaOrdem = ({ ordens, carregando, setOpenEditar, setOrdemServico, setMateriais, setCursor, cursor, setOpenDetalhes }) => {
    return (
        <Tabela cabecalhos={cabecalhos} carregando={carregando}>
            {ordens.map(ordem => (
                    <TableRow key={ordem.id}>
                        <TableCell align="center">{ordem.id}</TableCell>
                        <TableCell align="center">
                            {ordem.data_inicio_servico || "---"}
                        </TableCell>
                        <TableCell align="center">
                            {ordem.data_fim_servico || "---"}
                        </TableCell>
                        <TableCell align="center">{ordem.origem}</TableCell>
                        <TableCell align="center">{ordem.local_servico}</TableCell>
                        <TableCell align="center">
                            <Tooltip title="Visualizar" placement="left">
                                <IconButton 
                                    disabled={cursor === 'progress'}
                                    onClick={ () => getRegistro('ordem_servico', ordem.id, setOpenDetalhes, setOrdemServico, setCursor, setMateriais) }
                                >
                                    <ManageSearchIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Editar" placement="top">
                                <IconButton 
                                    disabled={cursor === 'progress'} 
                                    onClick={ () => getRegistro('ordem_servico', ordem.id, setOpenEditar, setOrdemServico, setCursor, setMateriais) }
                                >
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Baixa" placement="right">
                                <Link to={`/ordemservico/baixa/${ordem.id}`}>
                                    <IconButton disabled={cursor === 'progress'}>
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