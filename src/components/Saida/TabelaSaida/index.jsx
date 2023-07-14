import React from 'react';
import {
    TableRow,
    TableCell,
    Box
} from '@mui/material';
import Tabela from '../../Tabela';
import { authEditOrdem, formataDateTime } from '../../../common/utils';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import EditIcon from '@mui/icons-material/Edit';
import GradingIcon from '@mui/icons-material/Grading';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import PrintIcon from '@mui/icons-material/Print';
import { useNavigate } from 'react-router-dom';
import TabelaAcaoBtn from '../../TabelaAcaoBtn';

const cabecalhos = {
    "ID": "id",
    "Status": null,
    "Data da Baixa": "baixa_datahora",
    "Base origem": "origem.nome",
    "Local serviço": "locais.nome",
    "Ação": null
};

const TabelaSaida = ({ saidas, carregando, cursor, getSelectedOrdemInfo }) => {
    const perfil =  localStorage.getItem('perfil');
    const navigate = useNavigate()

    return (
        <Tabela 
            cabecalhos={cabecalhos} 
            carregando={carregando}
        >
            {saidas?.map(saida => (
                <TableRow key={saida.id}>
                    <TableCell align="center">{saida.id}</TableCell>
                    <TableCell align="center">{saida.status}</TableCell>
                    <TableCell align="center">
                        {formataDateTime(saida.baixa_datahora) || "---"}
                    </TableCell>
                    <TableCell align="center">{saida.origem}</TableCell>
                    <TableCell align="center">{saida.local_servico}</TableCell>
                    <TableCell align="center">
                        <Box className="grid grid-cols-3">
                            <TabelaAcaoBtn
                                title="Visualizar Saída"
                                placement="left"
                                disabled={cursor === 'progress'}
                                onClick={ () => getSelectedOrdemInfo(saida.id, 'visualizar') }
                            >
                                <ManageSearchIcon fontSize="small" />
                            </TabelaAcaoBtn>

                            <TabelaAcaoBtn
                                display={ authEditOrdem(localStorage.getItem('perfil')) }
                                title="Editar"
                                placement="right"
                                disabled={cursor === 'progress'}
                                onClick={ () => getSelectedOrdemInfo(saida.id, 'editar') }
                            >
                                <EditIcon fontSize="small" />
                            </TabelaAcaoBtn>

                            {saida.flg_baixa === 0
                                ?
                                    <TabelaAcaoBtn 
                                        display={ authEditOrdem(localStorage.getItem('perfil')) }
                                        title="Baixa"
                                        placement='left'
                                        onClick={ () => navigate(`/saida/${saida.id}/baixa`) }
                                        disabled={cursor === 'progress'}
                                    >
                                        <GradingIcon fontSize="small" />
                                    </TabelaAcaoBtn>
                                :
                                    <TabelaAcaoBtn 
                                        title="Visualizar Baixa"
                                        placement={authEditOrdem(perfil) === 'none' ? 'right' : 'left'}
                                        onClick={ () => getSelectedOrdemInfo(saida.id, 'baixa') }
                                        disabled={cursor === 'progress'}
                                    >
                                        <ContentPasteSearchIcon fontSize="small" />
                                    </TabelaAcaoBtn>
                            }

                            {/*<TabelaAcaoBtn 
                                display={ authEditOrdem(localStorage.getItem('perfil')) }
                                title="Imprimir"
                                placement='right'
                                onClick={ () => window.open(`${process.env.REACT_APP_API_URL}/ordem_servico/${ordem.id}/baixa_pdf`, '_blank') }
                                disabled={cursor === 'progress'}
                            >
                                <PrintIcon fontSize="small" />
                            </TabelaAcaoBtn>*/}
                        </Box>
                    </TableCell>
                </TableRow>
                )
            )}
        </Tabela>
    );
}

export default TabelaSaida;