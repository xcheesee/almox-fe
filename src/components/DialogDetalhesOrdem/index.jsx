import React from 'react';
import { 
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    Typography,
    DialogActions,
    Button
} from '@mui/material';
import TituloTexto from '../TituloTexto';

const DialogDetalhesOrdem = ({ openDetalhes, setOpenDetalhes, ordem }) => (
    <Dialog open={openDetalhes} fullWidth>
        <DialogTitle>
            Ordem de serviço #{ordem.id}
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
                    texto={ordem.departamento || "---"}
                />

                <TituloTexto 
                    titulo="Usuário"
                    texto={ordem.user || "---"}
                />

                <TituloTexto 
                    titulo="Origem"
                    texto={ordem.origem || "---"}
                />

                <TituloTexto
                    titulo="Local de serviço"
                    texto={ordem.local_servico || "---"}
                />

                <TituloTexto 
                    titulo="Data de início do serviço"
                    texto={ordem.data_inicio_servico || "---"}
                />

                <TituloTexto 
                    titulo="Data de fim do serviço"
                    texto={ordem.data_fim_servico || "---"}
                />

                <TituloTexto 
                    titulo="Nome do almoxarife"
                    texto={ordem.almoxarife_nome || "---"}
                />

                <TituloTexto 
                    titulo="E-mail do almoxarife"
                    texto={ordem.almoxarife_email || "---"}
                />

                <TituloTexto
                    titulo="Especificações"
                    texto={ordem.especificacao || "---"}
                    className="col-span-2"
                    component="code"
                    childComponent="pre"
                    childStyle={{ whiteSpace: 'pre-wrap' }}
                />

                <TituloTexto 
                    titulo="Observações"
                    texto={ordem.observacoes || "---"}
                    className="col-span-2"
                    component="code"
                    childComponent="pre"
                    childStyle={{ whiteSpace: 'pre-wrap' }}
                />

                <TituloTexto 
                    titulo="Profissional"
                    texto={ordem.profissional || "---"}
                />

                <TituloTexto 
                    titulo="Horas de execução"
                    texto={`${ordem.horas_execucao || "---"} ${ordem.horas_execucao > 1 ? "horas" : "hora"}`}
                />
            </Box>
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

export default DialogDetalhesOrdem;