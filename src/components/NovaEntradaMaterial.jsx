import React from 'react';
import { 
    Box, 
    Paper, 
    TextField, 
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography
} from '@mui/material';
import ContainerPrincipal from './ContainerPrincipal';
import Titulo from './Titulo';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const NovaEntradaMaterial = () => {
    const enviaForm = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const inputObject = Object.fromEntries(formData);

        console.log(inputObject);
    }

    return (
        <ContainerPrincipal>
            <Titulo voltaPara="/entrada">
                Nova entrada de material
            </Titulo>

            <Box
                elevation={3} 
                className="flex flex-col gap-10 p-4 my-4"
                component="form" 
                onSubmit={enviaForm}
                id="nova-entrada"
            >
                <TextField 
                    type="date"
                    name="data_entrada"
                    label="Data de entrada dos materiais"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                />

                <FormControl fullWidth>
                    <InputLabel id="local_destino-label">Local de destino dos materiais</InputLabel>
                    <Select
                        labelId="local_destino-label"
                        label="Local de destino dos materiais"
                        name="local_destino"
                        defaultValue=""
                    >
                        <MenuItem value="Teste_1">Teste 1</MenuItem>
                        <MenuItem value="Teste_2">Teste 2</MenuItem>
                        <MenuItem value="Teste_3">Teste 3</MenuItem>
                        <MenuItem value="Teste_4">Teste 4</MenuItem>
                        <MenuItem value="Teste_5">Teste 5</MenuItem>
                    </Select>
                </FormControl>

                <TextField 
                    name="processo_sei"
                    label="Processo SEI"
                    fullWidth
                />

                <TextField 
                    name="numero_contrato"
                    label="Número do contrato"
                    fullWidth
                />

                <TextField 
                    name="nota_fiscal"
                    label="Número da nota fiscal"
                    fullWidth
                />

                <TextField 
                    name="arquivo_nota_fiscal"
                    label="Arquivo da nota fiscal"
                    fullWidth
                />

                <Box>
                    <Typography sx={{ fontSize: '1.3rem', fontWeight: 'light', color: (theme) => theme.palette.color.bg, mb: '0.5rem' }}>
                        Materiais entregues
                    </Typography>

                    <Paper sx={{ background: (theme) => theme.palette.color.bgInterno, padding: '1rem', display: 'flex', flexDirection: 'column' }}>

                        <Box className="self-end">
                            <Button> 
                                <AddIcon fontSize="small" /> 
                                Adicionar material
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Box>
            
            <Box className="flex justify-end gap-4">
                <Button>
                    Cancelar
                </Button>
                <Button type="submit" form="nova-entrada" variant="contained">
                    Enviar
                </Button>
            </Box>
        </ContainerPrincipal>
    );
}

export default NovaEntradaMaterial;