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
import { token } from '../../common/utils';
import { useState } from 'react';

const BoxMateriais = (props) => {
    const {
        label,
        materiais,
        setMateriais,
    } = props;
    const [test, setTest] = useState({})

    const getMateriaisFromTipos = (e, c) => {
        console.log(e)
        console.log(c.props.className)
        let mats = [...materiais]
        let mat = {
            ...materiais[c.props.className],
            matDesabilitado: false,
        }
        mats[c.props.className] = mat
        setMateriais(mats)
    }
    const adicionaMaterial = () => {
        setMateriais(prev => [...prev, { 
            id: '',
            mats: [],
            quantidade: '',
            matDesabilitado: true,
            qtdDesabilitado: true,
            
        }]);
    }
    const modMaterial = (e, c) => {
        let mats = [...materiais]
        let mat = {
            ...materiais[c.props.matindex],
            qtdDesabilitado: false,
        }
        mats[c.props.matindex] = mat
        console.log(c)
        setMateriais(mats)
    }
    const removeMaterial = (index) => {
        let tempArr = materiais;
        tempArr.splice(index, 1);
        setMateriais([...tempArr]);
    }
    const setUnidadeMedida = (material) => {
        /* chamar api no set de dados */
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
    

    useEffect(() => {
        const url = `${process.env.REACT_APP_API_URL}/tipo_items`
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };
        
        const getData = async () => {
            const res = await fetch(url, options)
            const data = await res.json()
            return setTest(data)
        }
        getData()
        
    }, [])
    useEffect(() => { }, [materiais.length])

    

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
                                    onChange={getMateriaisFromTipos}
                                    className={`${index}`}
                                    fullWidth
                                >
                                    {test.data
                                        ?.map(val => <MenuItem value={val.id} className={`${index}`}/*  //indice do componente no state materiais */ >{val.nome}</MenuItem>)} {/* adicionar key ao map */}
                                </Selecao>

                                <Selecao
                                    /* desabilitado se valor anterior nao selecionado */
                                    label="Material"
                                    name="id"
                                    size="small"
                                    disabled={material.matDesabilitado}
                                    defaultValue={material.id}
                                    onChange={modMaterial}
                                    className={`${index}`}//indice do componente no state materiais
                                    fullWidth
                                >
                                    <MenuItem value={1} matindex={`${index}`}>Teste 1</MenuItem> {/* map com iterator sendo o valor selecionado no campo anterior */}
                                    <MenuItem value={2} matindex={`${index}`}>Teste 2</MenuItem>
                                    <MenuItem value={3} matindex={`${index}`}>Teste 3</MenuItem>
                                    <MenuItem value={4} matindex={`${index}`}>Teste 4</MenuItem>
                                    <MenuItem value={5} matindex={`${index}`}>Teste 5</MenuItem>
                                </Selecao>

                                <TextField
                                    /* desabilitado se valor anterior nao selecionado */
                                    name="quantidade"
                                    label="Quantidade"
                                    disabled={material.qtdDesabilitado}
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