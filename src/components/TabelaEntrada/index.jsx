import React from 'react';
import { mascaraProcessoSei, mascaraContrato } from '../../common/utils';
import {
    TableRow,
    TableCell,
    IconButton,
    Tooltip,
} from '@mui/material';
import Tabela from '../Tabela';
import { getRegistro } from '../../common/utils';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import EditIcon from '@mui/icons-material/Edit';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

const cabecalhos = [
    "ID",
    "Data",
    "Processo SEI",
    "Contrato",
    "Local",
    "Nota Fiscal",
    "Ação",
];

const TabelaEntrada = ({ entradas, carregando, setOpenEditar, setEntradaMaterial, setCursor, cursor }) => {
    return (
        <Tabela cabecalhos={cabecalhos} carregando={carregando}>
            {entradas.map(entrada => (
                    <TableRow key={entrada.id}>
                        <TableCell align="center">{entrada.id}</TableCell>
                        <TableCell align="center">{entrada.data_entrada || "---"}</TableCell>
                        <TableCell align="center">{mascaraProcessoSei(entrada.processo_sei || "---")}</TableCell>
                        <TableCell align="center">{mascaraContrato(entrada.numero_contrato || "---")}</TableCell>
                        <TableCell align="center">{entrada.local || "---"}</TableCell>
                        <TableCell align="center">{entrada.numero_nota_fiscal || "---"}</TableCell>
                        <TableCell align="center">
                            <Tooltip title="Visualizar" placement="left">
                                <IconButton disabled={cursor === 'progress'}>
                                    <ManageSearchIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Editar" placement="top">
                                <IconButton 
                                    disabled={cursor === 'progress'}
                                    onClick={ () => getRegistro('entrada', entrada.id, setOpenEditar, setEntradaMaterial, setCursor) }
                                >
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Listar materiais" placement="right">
                                <IconButton disabled={cursor === 'progress'}>
                                    <FormatListNumberedIcon />
                                </IconButton>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                )
            )}
        </Tabela>
    );
}

export default TabelaEntrada;