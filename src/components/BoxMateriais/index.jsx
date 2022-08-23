import React, { useEffect } from 'react';
import {
    Typography,
    Paper,
    Fade,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    InputAdornment,
    Tooltip,
    IconButton,
    Box,
    Button
} from '@mui/material';
import style from './style';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const BoxMateriais = (props) => {
    const {
        label,
        materiais,
        setMateriais
    } = props;

    useEffect(() => { }, [materiais.length])

    const adicionaMaterial = () => {
        setMateriais(prev => [...prev, { material: '', quantidade: '' }]);
    }

    const removeMaterial = (index) => {
        let tempArr = materiais;
        tempArr.splice(index, 1);
        setMateriais([...tempArr]);
    }

    const setUnidadeMedida = (material) => {
        switch (material) {
            case "Teste_1": return "Pç";
            case "Teste_2": return "Kg";
            case "Teste_3": return "Un";
            case "Teste_4": return "500 / Pç"
            case "Teste_5": return "L"
            default: return ""
        }
    }

    const handleChange = (e, i) => {
        const novoState = materiais.map((material, index) => {
            if (index === i)
                return { ...material, [e.target.name]: e.target.value }

            return material;
        });

        setMateriais(novoState);
    }

    return (
        <Box className="mx-8 mb-12">
            <Typography sx={style.label} >
                {label}
            </Typography>

            <Paper sx={style.container} >
                {materiais.map((material, index) => {
                    return (
                        <Fade in={true} key={index}>
                            <Paper className="p-4 mb-4 flex gap-4">
                                <FormControl fullWidth size="small">
                                    <InputLabel id="material-label">Material</InputLabel>
                                    <Select
                                        labelId="material-label"
                                        label="Material"
                                        name="material"
                                        value={material.material}
                                        onChange={(e) => handleChange(e, index)}
                                    >
                                        <MenuItem value="Teste_1">Teste 1</MenuItem>
                                        <MenuItem value="Teste_2">Teste 2</MenuItem>
                                        <MenuItem value="Teste_3">Teste 3</MenuItem>
                                        <MenuItem value="Teste_4">Teste 4</MenuItem>
                                        <MenuItem value="Teste_5">Teste 5</MenuItem>
                                    </Select>
                                </FormControl>

                                <TextField
                                    name="quantidade"
                                    label="Quantidade"
                                    defaultValue={material.quantidade}
                                    onChange={(e) => handleChange(e, index)}
                                    fullWidth
                                    size="small"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">{setUnidadeMedida(material.material)}</InputAdornment>,
                                    }}
                                />

                                <Tooltip title="Remover" placement="right">
                                    <Box>
                                        <IconButton onClick={() => removeMaterial(index)} disabled={index === 0}>
                                            <CloseIcon />
                                        </IconButton>
                                    </Box>
                                </Tooltip>
                            </Paper>
                        </Fade>
                    );
                })}

                <Box className="self-end">
                    <Button onClick={adicionaMaterial} >
                        <AddIcon fontSize="small" />
                        Adicionar material
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

export default BoxMateriais;