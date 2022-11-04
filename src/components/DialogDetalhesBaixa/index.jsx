import React from 'react';
import { 
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    Paper
} from '@mui/material';
import TituloTexto from '../TituloTexto';
import { formataDateTime } from '../../common/utils';
import styles from './style.js';

const DialogDetalhesBaixa = ({ openBaixa, setOpenBaixa, baixa }) => {
    return (
        <Dialog open={openBaixa} fullWidth maxWidth='md'>
            <DialogTitle>
                {baixa?.message}
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

                {/* <Box className="p-6 pt-2 grid grid-cols-2 gap-8">
                    <TituloTexto 
                        titulo="Departamento"
                        texto={baixa.baixa.departamento}
                        className="col-span-2"
                    />

                    <TituloTexto 
                        titulo="Nome do almoxarife"
                        texto={baixa.baixa.almoxarife_nome || "---"}
                    />

                    <TituloTexto 
                        titulo="E-mail do almoxarife"
                        texto={baixa.baixa.almoxarife_email || "---"}
                    />
                    
                    <TituloTexto 
                        titulo="Responsável"
                        texto={ baixa.baixa.baixa_user || "---" }
                    />

                    <TituloTexto 
                        titulo="Baixa efetuada em"
                        texto={ formataDateTime(baixa.baixa.baixa_datahora) || "---" }
                    />
                </Box> */}

                <Box className="p-6 pt-2 grid grid-cols-2 gap-8">
                    <TituloTexto 
                        titulo="Departamento"
                        className="col-span-2"
                        texto={baixa.baixa?.departamento}
                    />

                    <TituloTexto 
                        titulo="Origem"
                        texto={baixa.ordem_servico?.origem}
                    />

                    <TituloTexto 
                        titulo="Local de serviço"
                        texto={baixa.ordem_servico?.local_servico}
                    />

                    <TituloTexto
                        titulo="Especificações"
                        texto={baixa.ordem_servico?.especificacao || "---"}
                        className="col-span-2"
                        component="code"
                        childComponent="pre"
                        childStyle={{ whiteSpace: 'pre-wrap' }}
                    />
                    
                    <TituloTexto 
                        titulo="Data de início do serviço"
                        texto={ formataDateTime(baixa.ordem_servico?.data_inicio_servico) || "Data de início indeterminada" }
                    />

                    <TituloTexto 
                        titulo="Data de fim do serviço"
                        texto={ formataDateTime(baixa.ordem_servico?.data_fim_servico) || "Data de fim indeterminada" }
                    />

                    <TituloTexto 
                        titulo="Nome do almoxarife"
                        texto={baixa.baixa?.almoxarife_nome || "---"}
                    />

                    <TituloTexto 
                        titulo="E-mail do almoxarife"
                        texto={baixa.baixa?.almoxarife_email || "---"}
                    />

                    <TituloTexto 
                        titulo="Responsável"
                        texto={ baixa.baixa?.baixa_user || "---" }
                    />

                    <TituloTexto 
                        titulo="Baixa efetuada em"
                        texto={ formataDateTime(baixa.baixa?.baixa_datahora) || "---" }
                    />
                </Box>

                <Typography 
                    sx={{
                        color: (theme) => theme.palette.color.bg,
                        fontSize: '1.3rem',
                        fontWeight: 'light',
                        mb: '0.5rem',
                    }}
                >
                    Itens
                </Typography>

                <Box className='p-2'>
                    <TableContainer component={Paper} elevation={4}>
                        <Table>
                            <TableHead sx={styles.tableHead}>
                                <TableRow>
                                    <TableCell sx={styles.tableCell}>Material usado</TableCell>
                                    <TableCell align='center' sx={styles.tableCell}>Enviado</TableCell>
                                    <TableCell align='center' sx={styles.tableCell}>Usado</TableCell>
                                    <TableCell align='center' sx={styles.tableCell}>Retorno</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {baixa.baixa_items?.map(item => (
                                    <TableRow key={item.id}>
                                        <TableCell sx={styles.tableCell}>{item.item}</TableCell>
                                        <TableCell align='center' sx={styles.tableCell}>{item.enviado}</TableCell>
                                        <TableCell align='center' sx={styles.tableCell}>{item.usado}</TableCell>
                                        <TableCell align='center' sx={styles.tableCell}>{item.retorno}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenBaixa(false)}>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogDetalhesBaixa;