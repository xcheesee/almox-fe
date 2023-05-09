import React from 'react';
//import { mascaraProcessoSei, mascaraContrato, authEditEntrada } from '../../common/utils';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import {
    TableRow,
    TableCell,
    IconButton,
    Tooltip,
} from '@mui/material';
import Tabela from '../Tabela';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import EditIcon from '@mui/icons-material/Edit';
import { redirect, useNavigate } from 'react-router-dom';

const cabecalhos = {
    "ID": null,
    "Data": "data_transferencia",
    "Base Origem": "origem.nome",
    "Base Destino": "destino.nome",
    "Status": "status",
    "Ação": null
}

const TabelaTransferencia = (props) => {
    const { 
        //entradas, 
        carregando, 
        getSelectedEntradaInfo,
        cursor, 
    } = props;

    const entradas = [
        {
            id: 1,
            data_entrada: "27/01/1998",
            base_origem: "LAB",
            base_destino: "UEM Leopoldina",
            status: "Enviado"
        }
    ]

    const navigate = useNavigate()

    return (
        <Tabela 
            cabecalhos={cabecalhos} 
            carregando={carregando} 
        >
            {entradas?.map(entrada => (
                    <TableRow key={entrada.id}>
                        <TableCell align="center">{entrada.id}</TableCell>
                        <TableCell align="center">{entrada.data_entrada || "---"}</TableCell>
                        <TableCell align="center">{entrada.base_origem || "---"}</TableCell>
                        <TableCell align="center">{entrada.base_destino || "---"}</TableCell>
                        <TableCell align="center">{entrada.status || "---"}</TableCell>
                        <TableCell align="center">
                            <Tooltip title="Visualizar" placement="left">
                                <IconButton 
                                    disabled={cursor === 'progress'}
                                    onClick={ () => getSelectedEntradaInfo(entrada.id, 'visualizar') }
                                >
                                    <ManageSearchIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Recusar" placement="right" >
                                <IconButton 
                                    disabled={cursor === 'progress'}
                                    onClick={ () => navigate("/transferencia/recusa-transferencia") }
                                >
                                    <CancelScheduleSendIcon />
                                </IconButton>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                )
            )}
        </Tabela>
    );
}

export default TabelaTransferencia;