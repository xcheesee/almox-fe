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
import { formataDateTime } from '../../../common/utils';

export default function DialogDetalhesSaida ({ openDetalhes, setOpenDetalhes, saida, materiais, profissionais}) {
    return (
    <Dialog open={openDetalhes} fullWidth>
        <DialogTitle>
             Saida de Materiais #{saida.id}
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

            { !saida?.ordem_servico_id && <Box className='text-red-500'>Sem O.S</Box> }

            <Box className="mx-4 my-5 grid grid-cols-2 gap-8">
                <TituloTexto 
                    titulo="Departamento"
                    texto={saida.departamento || "---"}
                />

                <TituloTexto 
                    titulo="Usuário"
                    texto={saida.baixa_user || "---"}
                />

                <TituloTexto 
                    titulo="Origem"
                    texto={saida.origem || "---"}
                />

                <TituloTexto
                    titulo="Local de serviço"
                    texto={saida.local_servico || "---"}
                />

                <TituloTexto 
                    titulo="Status do serviço"
                    texto={saida.status|| "---"}
                />

                <TituloTexto 
                    titulo="Tipo de Serviço"
                    texto={saida.tipo_servico || "---"}
                />

                <TituloTexto 
                    titulo="Data de baixa"
                    texto={formataDateTime(saida.baixa_datahora) || "---"}
                />

                {saida?.justificativa_os
                    &&<TituloTexto
                        titulo="Justificativa"
                        texto={saida.justificativa_os || "---"}
                        className="col-span-2"
                        component="code"
                        childComponent="pre"
                        childStyle={{ whiteSpace: 'pre-wrap' }}
                    />
                } 
            </Box>

            {profissionais && profissionais.length > 0
                && <Box className='my-10'>
                    <Typography sx={{
                        color: (theme) => theme.palette.color.bg,
                        fontSize: '1.3rem',
                        fontWeight: 'light',
                        mb: '0.5rem'
                    }}>
                        Profissionais
                    </Typography>

                    <Paper 
                        className="flex flex-col gap-4 px-4 py-5" 
                        sx={{ backgroundColor: (theme) => theme.palette.color.bgInterno }}
                        elevation={3}
                    >
                        {profissionais?.map(profissional => (
                            <Paper className="p-3" key={`profissional-${profissional.profissional_id}`}>
                                <TituloTexto 
                                    titulo={profissional.nome}
                                    texto={`${profissional.data_inicio_formatada} -  ${profissional.horas_empregadas}h`}
                                />
                            </Paper>
                        ))}
                    </Paper>
                </Box>
            }

            {materiais && materiais.length > 0
                && <>
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
                        <Paper className="p-3" key={`material-${material.id}`}>
                            <TituloTexto 
                                titulo={material.item}
                                texto={`${material.quantidade} ${material.medida}`}
                            />
                        </Paper>
                    ))}
                </Paper>
                </>
            }
        </DialogContent>

        <DialogActions>
            <Button onClick={() => setOpenDetalhes(false)} >
                OK
            </Button>
        </DialogActions>
    </Dialog>
    )
};