import React from 'react';
import ArchiveIcon from '@mui/icons-material/Archive';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import {
    TableRow,
    TableCell,
    IconButton,
    Tooltip,
    Dialog,
} from '@mui/material';
import Tabela from '../../Tabela';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { useNavigate } from 'react-router-dom';
import { formataDateTime, isAllowedTransf } from '../../../common/utils';
import RecusaTranferencia from '../../../Pages/Transferencia/recusaTransferencia';

const cabecalhos = {
    "ID": null,
    "Data": "data_transferencia",
    "Base Origem": "origem",
    "Base Destino": "destino",
    "Status": "status",
    "Ação": null
}

const TabelaTransferencia = (props) => {
    const { 
        itens, 
        carregando, 
        getSelectedTransfInfo,
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
                        <TableCell align="center" className='capitalize'>{entrada.origem || "---"}</TableCell>
                        <TableCell align="center" className='capitalize'>{entrada.destino || "---"}</TableCell>
                        <TableCell align="center" className='capitalize'>{entrada.status || "---"}</TableCell>
                        <TableCell align="center">
                            <Tooltip title="Visualizar" placement="left">
                                <IconButton 
                                    disabled={cursor === 'progress'}
                                    onClick={ () => getSelectedTransfInfo(entrada.id, "visualizar") }
                                >
                                    <ManageSearchIcon />
                                </IconButton>
                            </Tooltip>
                            {
                                entrada.status === "enviado" && isAllowedTransf()
                                    ?<>
                                    <Tooltip title="Recusar" placement="right" >
                                        <IconButton 
                                            disabled={cursor === 'progress'}
                                            onClick={ () => navigate(`/transferencia/recusa-transferencia/${entrada.id}`) }
                                        >
                                            <DoNotDisturbAltIcon />
                                        </IconButton>
                                    </Tooltip> 
                                    <Tooltip title="Receber" placement="right" >
                                        <IconButton 
                                            disabled={cursor === 'progress'}
                                            onClick={ () => getSelectedTransfInfo(entrada.id, "confirmar") }
                                        >
                                            <ArchiveIcon />
                                        </IconButton>
                                    </Tooltip> 
                                    </>
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