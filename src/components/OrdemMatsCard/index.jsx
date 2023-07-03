import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import TituloTexto from "../TituloTexto";

export default function OrdemMatsCard ({materiais, isLoading}) {
    if (isLoading) return (<Box className="flex justify-center">
        <CircularProgress size={24} />
    </Box>)
    if (!materiais) return <></>
    return(
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

    )
}