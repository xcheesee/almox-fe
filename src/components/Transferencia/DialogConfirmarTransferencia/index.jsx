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
import { formataDateTime, confirmaTransferencia } from '../../../common/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { snackbarAtom } from '../../../atomStore';

const DialogConfirmarTransferencia = ({ 
    openConfirmar,
    setOpenConfirmar,
    dados,
    materiais,
    isLoading,
    setIsLoading
}) => {
    const setSnackbar = useSetAtom(snackbarAtom)

    const queryClient = useQueryClient() 
    const confirmarMutation = useMutation( async (id_transferencia) => {
        setIsLoading(true);
        await confirmaTransferencia(id_transferencia)
    }, {
        onSuccess: async () => {
            await queryClient.invalidateQueries(['transferencias'])
            setIsLoading(false);
            setSnackbar({
                open: true,
                severity: "success",
                message: "Transferencia Recebida Com Sucesso!"
            })
        },
        onError: async (res) => {
            setSnackbar({
                open: true,
                severity: "error",
                message: res.text
            })
            setIsLoading(false)
        }
    })

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
                </Box>

                {materiais && materiais.length > 0
                    ?<>
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
                    :<></>
                }
            </DialogContent>

            <DialogActions>
                <Button onClick={ () => setOpenConfirmar(false) }>
                    Cancelar
                </Button>
                <Button 
                    onClick={() => {
                        confirmarMutation.mutate(dados.id)
                        setOpenConfirmar(false)}
                    }
                    variant='contained'
                    color="primary"
                >
                    Receber
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogConfirmarTransferencia;