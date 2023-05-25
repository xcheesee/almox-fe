import React from 'react';
import { 
    DialogTitle,
    DialogContent,
    Box,
    Typography,
    DialogActions,
    Button,
    Paper,
    CircularProgress,
    Dialog,
    Modal
} from '@mui/material';
import TituloTexto from '../../TituloTexto';
import { mascaraContrato, formataDateTime } from '../../../common/utils';

const DialogConfirmarTransferencia = ({ openConfirmar, setOpenConfirmar, dados, materiais, isLoading }) => {
    if (isLoading)
        return (
            <Modal open>
                <Box className='flex justify-center items-center w-full h-full'>
                    <CircularProgress size={36} color='color'/>
                </Box>
            </Modal>
        )

    return (
        <Dialog open={openConfirmar} fullWidth>
            <DialogTitle>Receber Transferencia #{dados.id}</DialogTitle>
            <DialogContent>
                <Typography 
                    sx={{
                        color: (theme) => theme.palette.color.bg,
                        fontSize: '1.3rem',
                        fontWeight: 'light',
                        mb: '0.5rem',
                    }}
                >
                    Detalhes
                </Typography>
                
                <Box className="mx-4 my-5 grid grid-cols-2 gap-8">
                    <TituloTexto 
                        titulo="Base de Destino"
                        texto={dados.destino || "---"}
                    />

                    <TituloTexto 
                        titulo="Base de Origem"
                        texto={dados.origem || "---"}
                    />

                    <TituloTexto 
                        titulo="Data de Envio"
                        texto={formataDateTime(dados.data_transferencia) || "---"}
                    />

                    <TituloTexto 
                        titulo="Status"
                        className="capitalize"
                        texto={dados.status || "---"}
                    />

                    {
                        dados.status === "recusado"
                            ?<>
                            <TituloTexto 
                                titulo="Motivo da Recusa"
                                texto={mascaraContrato(dados.observacao_motivo|| "---")}

                            />

                            <TituloTexto 
                                titulo="Observacoes"
                                texto={dados.observacao || "---"}
                            />
                            </>
                            :<></>
                    }

                </Box>

                {materiais && materiais.length > 0
                    ?
                        <>
                            <Typography sx={{
                                color: (theme) => theme.palette.color.bg,
                                fontSize: '1.3rem',
                                fontWeight: 'light',
                                mb: '0.5rem'
                            }}>
                                Materiais
                            </Typography>
                            <Paper 
                                className="flex flex-col gap-4 px-4 py-5" 
                                sx={{ backgroundColor: (theme) => theme.palette.color.bgInterno }}
                                elevation={3}
                            >
                                {materiais.map(material => (
                                    <Paper className="p-3" key={material.id}>
                                        <TituloTexto 
                                            titulo={material.item}
                                            texto={`${material.quantidade} ${material.medida}`}
                                        />
                                    </Paper>
                                ))}
                            </Paper>
                        </>
                    :
                        ""
                }
            </DialogContent>

            <DialogActions>
                <Button 
                    onClick={() => setOpenConfirmar(false)}
                >
                    Cancelar
                </Button>
                <Button 
                    onClick={() => setOpenConfirmar(false)}
                    variant='contained'
                    color="primary"
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogConfirmarTransferencia;