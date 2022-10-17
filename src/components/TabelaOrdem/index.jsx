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
import PrintIcon from '@mui/icons-material/Print';
import { Link } from 'react-router-dom';

const cabecalhos = {
    "ID": "id",
    "Status": "status",
    "Início do serviço": "data_inicio_servico",
    "Fim do serviço": "data_fim_servico",
    "Base origem": "origem.nome",
    "Local serviço": "locais.nome",
    "Ação": null
};

const TabelaOrdem = ({ ordens, carregando, setCarregando, setOpenEditar, setOrdemServico, setMateriais, setCursor, cursor, setOpenDetalhes, sort, setSort }) => {
    return (
        <Tabela cabecalhos={cabecalhos} carregando={carregando} setCarregando={setCarregando} sort={sort} setSort={setSort}>
            {ordens.map(ordem => (
                    <TableRow key={ordem.id}>
                        <TableCell align="center">{ordem.id}</TableCell>
                        <TableCell align="center">{ordem.status}</TableCell>
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
                            {
                                ordem.flg_baixa === 0
                                ?
                                    <Tooltip title="Baixa" placement="right" >
                                        <Link to={`/ordemservico/baixa/${ordem.id}`}>
                                            <IconButton disabled={cursor === 'progress'}>
                                                <GradingIcon />
                                            </IconButton>
                                        </Link>
                                    </Tooltip>
                                :
                                    <Tooltip title="Imprimir baixa" placement="right" >
                                        <a 
                                            href={`${process.env.REACT_APP_API_URL}/ordem_servico/${ordem.id}/baixa_pdf`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <IconButton disabled={cursor === 'progress'}>
                                                <PrintIcon />
                                            </IconButton>
                                        </a>
                                    </Tooltip>
                            }
                        </TableCell>
                    </TableRow>
                )
            )}
        </Tabela>
    );
}

export default TabelaOrdem;