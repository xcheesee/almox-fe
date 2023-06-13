import React from 'react';
import { mascaraProcessoSei, mascaraContrato, authEditEntrada } from '../../../common/utils';
import {
    TableRow,
    TableCell,
    IconButton,
    Tooltip,
} from '@mui/material';
import Tabela from '../../Tabela';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import EditIcon from '@mui/icons-material/Edit';

const cabecalhos = {
    "ID": null,
    "Data": "data_entrada",
    "Processo SEI": "processo_sei",
    "Contrato": "numero_contrato",
    "Local": "locais.nome",
    "Nota fiscal": "numero_nota_fiscal",
    "Ação": null
}

const TabelaEntrada = (props) => {
    const { 
        entradas, 
        carregando, 
        getSelectedEntradaInfo,
        cursor, 
    } = props;

    return (
        <Tabela 
            cabecalhos={cabecalhos} 
            carregando={carregando} 
        >
            {entradas?.map(entrada => (
                    <TableRow key={entrada.id}>
                        <TableCell align="center">{entrada.id}</TableCell>
                        <TableCell align="center">{entrada.data_entrada || "---"}</TableCell>
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
                                    disabled={cursor === 'progress'}
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