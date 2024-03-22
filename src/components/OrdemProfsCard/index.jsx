import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import TituloTexto from "../TituloTexto";

export default function OrdemProfsCard ({profissionais, isLoading}) {
    if (isLoading) return (
        <Box className="flex justify-center py-4">
            <CircularProgress size={24} />
        </Box>
    )

    if (!profissionais || profissionais?.length === 0) return <></>

    return (
        <Box className="py-4">
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
                    <Paper className="p-3" key={profissional.profissional_id}>
                        <TituloTexto 
                            titulo={profissional.profissional}
                            texto={`${profissional.data_inicio_formatada} - ${profissional.horas_empregadas}h`}
                        />
                    </Paper>
                ))}
            </Paper>
        </Box>
    )
}