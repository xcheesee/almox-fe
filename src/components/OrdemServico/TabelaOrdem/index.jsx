import React from 'react';
import {
    TableRow,
    TableCell,
    Box,
    CircularProgress
} from '@mui/material';
import Tabela from '../../Tabela';
import { authEditOrdem, formataDateTime, getDados, isPermittedEdit } from '../../../common/utils';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import TabelaAcaoBtn from '../../TabelaAcaoBtn';
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../../../common/utils/hooks';

const cabecalhos = {
    "ID": "id",
    "Data de Emissão": "created_at",
    "Base origem": "origem.nome",
    "Local serviço": "locais.nome",
    "Ação": null
};


const TabelaOrdem = ({ ordens, carregando, cursor, getSelectedOrdemInfo }) => {

    const { userId } = useAuth()

    const locaisUsers = useQuery({
        queryFn: () => getDados('local_users/'+userId),
        queryKey: ['locaisUser', userId],
    })

    if(locaisUsers.isLoading) 
        return<Box className="w-full flex justify-center"><CircularProgress size={32}/></Box>;

    return (
        <Tabela 
            cabecalhos={cabecalhos} 
            carregando={carregando}
        >
            {ordens?.map(ordem => (
                <TableRow key={ordem.id}>
                    <TableCell align="center">{ordem.id}</TableCell>
                    <TableCell align="center">
                        {formataDateTime(ordem.data_inicio_servico) || "---"}
                    </TableCell>
                    <TableCell align="center">{ordem.origem}</TableCell>
                    <TableCell align="center">{ordem.local_servico}</TableCell>
                    <TableCell align="center">
                        <Box className='flex justify-center'>
                        <Box className="grid lg:grid-cols-3 gap-2">
                            <TabelaAcaoBtn
                                title="Visualizar Ordem"
                                placement="left"
                                disabled={cursor === 'progress'}
                                onClick={ () => getSelectedOrdemInfo(ordem.id, 'visualizar') }
                            >
                                <ManageSearchIcon fontSize="small" />
                            </TabelaAcaoBtn>

                            <TabelaAcaoBtn
                                display={ authEditOrdem(localStorage.getItem('perfil')) }
                                title="Editar"
                                placement="right"
                                disabled={cursor === 'progress' || !isPermittedEdit(locaisUsers.data?.data, ordem.origem_id)}
                                onClick={ () => getSelectedOrdemInfo(ordem.id, 'editar') }
                            >
                                <EditIcon fontSize="small" />
                            </TabelaAcaoBtn>

                            <TabelaAcaoBtn 
                                display={ authEditOrdem(localStorage.getItem('perfil')) }
                                title="Imprimir"
                                placement='right'
                                onClick={ () => window.open(`${process.env.REACT_APP_API_URL}/ordem_servico/${ordem.id}/baixa_pdf`, '_blank') }
                                disabled={cursor === 'progress'}
                            >
                                <PrintIcon fontSize="small" />
                            </TabelaAcaoBtn>
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