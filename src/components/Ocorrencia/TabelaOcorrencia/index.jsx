import React, { useState } from 'react';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { TableRow, TableCell, Modal, CircularProgress, Box } from '@mui/material';
import Tabela from '../../Tabela';
import { formataDateTime, getOcorrenciaPDF } from '../../../common/utils';
import TabelaAcaoBtn from '../../TabelaAcaoBtn';

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

export default function TabelaOcorrencia (props) {
    const { 
        itens, 
        carregando, 
    } = props;

    const [isLoading, setIsLoading] = useState(false)

    return (
        <>
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
                                {entrada.tipo_ocorrencia !== "avaria"
                                    ?<TabelaAcaoBtn
                                        title="Visualizar Boletim"
                                        placement="right"
                                        disabled={isLoading}
                                        onClick={ async () => {
                                            setIsLoading(true)
                                            await openPdfPopup(entrada.id)
                                            setIsLoading(false)
                                        } }
                                    >
                                        <PictureAsPdfIcon />
                                    </TabelaAcaoBtn>
                                    :<></>
                                }
                            </TableCell>
                        </TableRow>
                    ))
                }
            </Tabela>
            <Modal open={isLoading}>
                <Box className='flex justify-center items-center h-full'>
                    <CircularProgress size={64} color='color'/>
                </Box>
            </Modal>
        </>
    );
}