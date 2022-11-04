import React from 'react';
import {
    TableRow,
    TableCell,
    IconButton,
    Tooltip,
    Box
} from '@mui/material';
import Tabela from '../Tabela';
import { authEditOrdem, getRegistro } from '../../common/utils';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import EditIcon from '@mui/icons-material/Edit';
import GradingIcon from '@mui/icons-material/Grading';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import PrintIcon from '@mui/icons-material/Print';
import { Link } from 'react-router-dom';
import { matsAtom } from '../../atomStore';
import { useSetAtom } from 'jotai';

const cabecalhos = {
    "ID": "id",
    "Status": null,
    "Início do serviço": "data_inicio_servico",
    "Fim do serviço": "data_fim_servico",
    "Base origem": "origem.nome",
    "Local serviço": "locais.nome",
    "Ação": null
};

const TabelaOrdem = ({ ordens, carregando, cursor, getSelectedOrdemInfo, }) => {
    const perfil =  localStorage.getItem('perfil');

    return (
        <Tabela 
            cabecalhos={cabecalhos} 
            carregando={carregando}
        >
            {ordens?.map(ordem => (
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
                            <Box className="grid grid-cols-2">
                                <Box>
                                    <Tooltip title="Visualizar ordem" placement="left">
                                        <IconButton 
                                            disabled={cursor === 'progress'}
                                            onClick={ () => getSelectedOrdemInfo(ordem.id, 'visualizar') }
                                        >
                                            <ManageSearchIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <Box>
                                    <Tooltip title="Editar" placement="right" sx={{ display: authEditOrdem(perfil) }}>
                                        <IconButton 
                                            disabled={cursor === 'progress'} 
                                            onClick={ () => getSelectedOrdemInfo(ordem.id, 'editar') }
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                {
                                    ordem.flg_baixa === 0
                                    ?
                                        <Box sx={{ display: authEditOrdem(localStorage.getItem('perfil')) }}>
                                            <Tooltip title="Baixa" placement="left" sx={{ display: authEditOrdem(localStorage.getItem('perfil')) }}>
                                                <Link to={`/ordemservico/baixa/${ordem.id}`} >
                                                    <Box>
                                                        <IconButton disabled={cursor === 'progress'}>
                                                            <GradingIcon fontSize="small" />
                                                        </IconButton>
                                                    </Box>
                                                </Link>
                                            </Tooltip>
                                        </Box>
                                    :
                                        <Box>
                                            <Tooltip title="Visualizar baixa" placement={authEditOrdem(perfil) === 'none' ? 'right' : 'left'} >
                                                <IconButton disabled={cursor === 'progress'}>
                                                    <ContentPasteSearchIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                }
                                <Box sx={{ display: authEditOrdem(localStorage.getItem('perfil')) }}>
                                    <Tooltip title="Imprimir" placement="right" sx={{ display: authEditOrdem(localStorage.getItem('perfil')) }}>
                                        <a 
                                            href={`${process.env.REACT_APP_API_URL}/ordem_servico/${ordem.id}/baixa_pdf`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <IconButton disabled={cursor === 'progress'}>
                                                <PrintIcon fontSize="small" />
                                            </IconButton>
                                        </a>
                                    </Tooltip>
                                </Box>
                            </Box>
                        </TableCell>
                    </TableRow>
                )
            )}
        </Tabela>
    );
}

export default TabelaOrdem;