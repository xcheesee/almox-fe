import React from 'react';
import { mascaraProcessoSei, mascaraContrato, authEditEntrada, formataDateTime, getDados, isPermittedEdit } from '../../../common/utils';
import {
    TableRow,
    TableCell,
    IconButton,
    Tooltip,
    Box,
    CircularProgress
} from '@mui/material';
import Tabela from '../../Tabela';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '../../../common/utils/hooks';
import { useQuery } from '@tanstack/react-query'

const cabecalhos = {
    "ID": null,
    "Data": "data_entrada",
    "Processo SEI": "processo_sei",
    "Contrato": "numero_contrato",
    "Local": "locais.nome",
    "Nota fiscal": "numero_nota_fiscal",
    "Ação": null
}

const TabelaEntrada = ({ 
        entradas, 
        carregando, 
        getSelectedEntradaInfo,
        cursor, 
    }) => {
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
            {entradas?.map(entrada => (
                    <TableRow key={entrada.id}>
                        <TableCell align="center">{entrada.id}</TableCell>
                        <TableCell align="center">{formataDateTime(entrada.data_entrada) || "---"}</TableCell>
                        <TableCell align="center">{mascaraProcessoSei(entrada.processo_sei || "---")}</TableCell>
                        <TableCell align="center">{mascaraContrato(entrada.numero_contrato || "---")}</TableCell>
                        <TableCell align="center">{entrada.local || "---"}</TableCell>
                        <TableCell align="center">{entrada.numero_nota_fiscal || "---"}</TableCell>
                        <TableCell align="center">
                            <Tooltip title="Visualizar" placement="left">
                                <IconButton 
                                    disabled={cursor === 'progress'}
                                    onClick={ () => getSelectedEntradaInfo(entrada.id, 'visualizar') }
                                >
                                    <ManageSearchIcon />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Editar" placement="right" sx={{ display: authEditEntrada(localStorage.getItem('perfil')) }}>
                                <IconButton 
                                    disabled={cursor === 'progress' || !isPermittedEdit(locaisUsers.data?.data, entrada.local_id)}
                                    onClick={ () => getSelectedEntradaInfo(entrada.id, 'editar') }
                                >
                                    <EditIcon />
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