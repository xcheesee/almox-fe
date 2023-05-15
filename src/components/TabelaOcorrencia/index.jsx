import React from 'react';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
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

const cabecalhos = {
    "ID": null,
    "Data": "data_transferencia",
    "Local": "local_id",
    "Tipo de Ocorrencia": "tipo_ocorrencia",
    "Ação": null
}

const TabelaOcorrencia = (props) => {
    const { 
        itens, 
        carregando, 
        getSelectedEntradaInfo,
        cursor, 
    } = props;

    const navigate = useNavigate()

    return (
        <Tabela 
            cabecalhos={cabecalhos} 
            carregando={carregando} 
        >
            
            {carregando
                ? <></> 
                :itens?.map(entrada => (
                    <TableRow key={entrada.id}>
                        <TableCell align="center">{entrada.id}</TableCell>
                        <TableCell align="center">{formataDateTime(entrada.data_ocorrencia) || "---"}</TableCell>
                        <TableCell align="center" className='capitalize'>{entrada.local_id || "---"}</TableCell>
                        <TableCell align="center" className='capitalize'>{entrada.tipo_ocorrencia || "---"}</TableCell>
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
                                entrada.tipo_ocorrencia !== "avaria"
                                    ?<Tooltip title="Visualizar Boletim" placement="right" >
                                        <IconButton 
                                            disabled={cursor === 'progress'}
                                        >
                                            <PictureAsPdfIcon />
                                        </IconButton>
                                    </Tooltip> 
                                    :<></>
                            }
                            
                        </TableCell>
                    </TableRow>
                )
            )}
        </Tabela>
    );
}

export default TabelaOcorrencia;