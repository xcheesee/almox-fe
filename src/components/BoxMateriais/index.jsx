import React, { useEffect } from 'react';
import {
    Typography,
    Paper,
    Fade,
    MenuItem,
    TextField,
    InputAdornment,
    Tooltip,
    IconButton,
    Box,
    Button
} from '@mui/material';
import style from './style';
import Selecao from '../Selecao';
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
        setMateriais(prev => [...prev, { id: '', quantidade: '' }]);
    }

    const removeMaterial = (index) => {
        let tempArr = materiais;
        tempArr.splice(index, 1);
        setMateriais([...tempArr]);
    }

    const setUnidadeMedida = (material) => {
        switch (material.id) {
            case 1: return "Pç";
            case 2: return "Kg";
            case 3: return "Un";
            case 4: return "500 / Pç"
            case 5: return "L"
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
                                <Selecao
                                    label="Tipo de material"
                                    name="tipo_material"
                                    size="small"
                                    fullWidth
                                >
                                    <MenuItem value="Teste_1">Teste 1</MenuItem>
                                    <MenuItem value="Teste_2">Teste 2</MenuItem>
                                    <MenuItem value="Teste_3">Teste 3</MenuItem>
                                    <MenuItem value="Teste_4">Teste 4</MenuItem>
                                    <MenuItem value="Teste_5">Teste 5</MenuItem>
                                </Selecao>

                                <Selecao
                                    label="Material"
                                    name="id"
                                    size="small"
                                    defaultValue={material.id}
                                    onChange={(e) => handleChange(e, index)}
                                    fullWidth
                                >
                                    <MenuItem value={1}>Teste 1</MenuItem>
                                    <MenuItem value={2}>Teste 2</MenuItem>
                                    <MenuItem value={3}>Teste 3</MenuItem>
                                    <MenuItem value={4}>Teste 4</MenuItem>
                                    <MenuItem value={5}>Teste 5</MenuItem>
                                </Selecao>

                                <TextField
                                    name="quantidade"
                                    label="Quantidade"
                                    defaultValue={material.quantidade}
                                    onChange={(e) => handleChange(e, index)}
                                    fullWidth
                                    size="small"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">{setUnidadeMedida(material)}</InputAdornment>,
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