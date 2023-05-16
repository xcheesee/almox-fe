import React from 'react';
//import { mascaraProcessoSei, mascaraContrato, authEditEntrada } from '../../common/utils';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import {
    TableRow,
    TableCell,
    IconButton,
    Tooltip,
    Dialog,
} from '@mui/material';
import Tabela from '../Tabela';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { useNavigate } from 'react-router-dom';
import { formataDateTime } from '../../common/utils';
import RecusaTranferencia from '../../Pages/Transferencia/recusaTransferencia';

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
        itens, 
        carregando, 
        getSelectedEntradaInfo,
        cursor, 
    } = props;

    const navigate = useNavigate()

    return (
        <>
        <Tabela 
            cabecalhos={cabecalhos} 
            carregando={carregando} 
        >
            
            {carregando
                ? <></> 
                :itens?.map(entrada => (
                    <TableRow key={entrada.id}>
                        <TableCell align="center">{entrada.id}</TableCell>
                        <TableCell align="center">{formataDateTime(entrada.data_transferencia) || "---"}</TableCell>
                        <TableCell align="center" className='capitalize'>{entrada.base_origem_id.nome || "---"}</TableCell>
                        <TableCell align="center" className='capitalize'>{entrada.base_destino_id.nome || "---"}</TableCell>
                        <TableCell align="center" className='capitalize'>{entrada.status || "---"}</TableCell>
                        <TableCell align="center">
                            <Tooltip title="Visualizar" placement="left">
                                <IconButton 
                                    disabled={cursor === 'progress'}
                                    onClick={ () => getSelectedEntradaInfo(entrada.id, 'visualizar') }
                                >
                                    <ManageSearchIcon />
                                </IconButton>
                            </Tooltip>
                            {
                                entrada.status === "enviado"
                                    ?<Tooltip title="Recusar" placement="right" >
                                        <IconButton 
                                            disabled={cursor === 'progress'}
                                            onClick={ () => navigate(`/transferencia/recusa-transferencia/${entrada.id}`) }
                                        >
                                            <CancelScheduleSendIcon />
                                        </IconButton>
                                    </Tooltip> 
                                    :<></>
                            }
                        </TableCell>
                    </TableRow>
                )
            )}
        </Tabela>
        <Dialog open={false}>
            <RecusaTranferencia />
        </Dialog>
        </>
    );
}

export default TabelaTransferencia;