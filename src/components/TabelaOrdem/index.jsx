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
    "Status": "status",
    "Início do serviço": "data_inicio_servico",
    "Fim do serviço": "data_fim_servico",
    "Base origem": "origem.nome",
    "Local serviço": "locais.nome",
    "Ação": null
};

const TabelaOrdem = ({ ordens, carregando, setOpenEditar, setOrdemServico, setCursor, cursor, setOpenDetalhes, }) => {
    const setMateriais = useSetAtom(matsAtom)

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
                                <Tooltip title="Visualizar ordem" placement="left">
                                    <IconButton 
                                        disabled={cursor === 'progress'}
                                        onClick={ () => getRegistro('ordem_servico', ordem.id, setOpenDetalhes, setOrdemServico, setCursor, setMateriais) }
                                    >
                                        <ManageSearchIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Editar" placement="right" sx={{ display: authEditOrdem(perfil) }}>
                                    <IconButton 
                                        disabled={cursor === 'progress'} 
                                        onClick={ () => getRegistro('ordem_servico', ordem.id, setOpenEditar, setOrdemServico, setCursor, setMateriais) }
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                                {
                                    ordem.flg_baixa === 0
                                    ?
                                        <Tooltip title="Baixa" placement="left" sx={{ display: authEditOrdem(localStorage.getItem('perfil')) }}>
                                            <Box sx={{ display: authEditOrdem(localStorage.getItem('perfil')) }}>
                                                <Link to={`/ordemservico/baixa/${ordem.id}`} >
                                                    <IconButton disabled={cursor === 'progress'}>
                                                        <GradingIcon fontSize="small" />
                                                    </IconButton>
                                                </Link>
                                            </Box>
                                        </Tooltip>
                                    :
                                        <Tooltip title="Visualizar baixa" placement={authEditOrdem(perfil) === 'none' ? 'right' : 'left'} >
                                            <IconButton disabled={cursor === 'progress'}>
                                                <ContentPasteSearchIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                }
                                <Tooltip title="Imprimir" placement="right" sx={{ display: authEditOrdem(localStorage.getItem('perfil')) }}>
                                    <Box sx={{ display: authEditOrdem(localStorage.getItem('perfil')) }}>
                                        <a 
                                            href={`${process.env.REACT_APP_API_URL}/ordem_servico/${ordem.id}/baixa_pdf`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <IconButton disabled={cursor === 'progress'}>
                                                <PrintIcon fontSize="small" />
                                            </IconButton>
                                        </a>
                                    </Box>
                                </Tooltip>
                            </Box>
                        </TableCell>
                    </TableRow>
                )
            )}
        </Tabela>
    );
}

export default TabelaOrdem;