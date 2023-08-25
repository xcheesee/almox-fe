import React from 'react';
import { 
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    Typography,
    DialogActions,
    Button,
    Paper
} from '@mui/material';
import TituloTexto from '../../TituloTexto';
import { mascaraProcessoSei, mascaraContrato, formataDateTime } from '../../../common/utils';

const DialogDetalhesEntrada = ({ openDetalhes, setOpenDetalhes, entrada, materiais }) => {
    return (
        <Dialog open={openDetalhes} fullWidth>
            <DialogTitle>
                Entrada #{entrada.id}
            </DialogTitle>
            
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
                        titulo="Departamento"
                        texto={entrada.departamento || "---"}
                    />

                    <TituloTexto 
                        titulo="Local"
                        texto={entrada.local || "---"}
                    />

                    <TituloTexto 
                        titulo="Data de entrada"
                        texto={formataDateTime(entrada.data_entrada) || "---"}
                    />

                    <TituloTexto 
                        titulo="Processo SEI"
                        texto={mascaraProcessoSei(entrada.processo_sei || "---")}
                    />

                    <TituloTexto 
                        titulo="Número do contrato"
                        texto={mascaraContrato(entrada.numero_contrato || "---")}
                    />

                    <TituloTexto 
                        titulo="Número da nota fiscal"
                        texto={entrada.numero_nota_fiscal || "---"}
                    />

                    <TituloTexto
                        titulo="Arquivo da nota fiscal"
                        texto={
                            <a 
                                target="_blank"
                                rel="noreferrer"
                                href={entrada.arquivo_nota_fiscal_url || "#"}
                            >
                                {entrada.arquivo_nota_fiscal || "---"}
                            </a>
                        }
                        className="col-span-2"
                    />

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
                    onClick={() => setOpenDetalhes(false)}
                >
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogDetalhesEntrada;