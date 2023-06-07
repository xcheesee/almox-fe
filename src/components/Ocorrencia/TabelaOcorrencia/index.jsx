import React from 'react';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import {
    TableRow,
    TableCell,
    IconButton,
    Tooltip,
} from '@mui/material';
import Tabela from '../../Tabela';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { formataDateTime, getOcorrenciaPDF } from '../../../common/utils';

async function openPdfPopup(id) {
    const res = await getOcorrenciaPDF(id)
    const blob = await res.blob()
    const file = window.URL.createObjectURL(blob)
    return window.open(file)
}

const cabecalhos = {
    "ID": null,
    "Data": "data_ocorrencia",
    "Local": "local",
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

    //const navigate = useNavigate()

    return (
        <Tabela 
            cabecalhos={cabecalhos} 
            carregando={carregando} 
        >
            
            {carregando
                ? <></> 
                :itens?.map(entrada => (
                    <TableRow key={entrada.id} sx={{height: '4rem'}}>
                        <TableCell align="center">{entrada.id}</TableCell>
                        <TableCell align="center">{formataDateTime(entrada.data_ocorrencia) || "---"}</TableCell>
                        <TableCell align="center" className='capitalize'>{entrada.local || "---"}</TableCell>
                        <TableCell align="center" className='capitalize'>{entrada.tipo_ocorrencia || "---"}</TableCell>
                        <TableCell align="center">
                            {/*<Tooltip title="Visualizar" placement="left">
                                <IconButton 
                                    disabled={cursor === 'progress'}
                                    onClick={ () => getSelectedEntradaInfo(entrada.id, 'visualizar') }
                                >
                                    <ManageSearchIcon />
                                </IconButton>
                            </Tooltip>*/}
                            {
                                entrada.tipo_ocorrencia !== "avaria"
                                    ?<Tooltip title="Visualizar Boletim" placement="right" >
                                        <IconButton 
                                            disabled={cursor === 'progress'}
                                            onClick={async () => openPdfPopup(entrada.id) }
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