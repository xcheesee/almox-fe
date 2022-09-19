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
    const [tiposMats, setTiposMats] = useState({})
    const [tipoDesabilitado, setTipoDesabilitado] = useState(true)

    const getMateriaisFromTipos = (e, c) => {
        setMateriais(modMaterial(c.props.matindex, {matDesabilitado: true}));

        const url = `${process.env.REACT_APP_API_URL}/items/tipo/${c.props.value}`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };

        (async () => {
            const res = await fetch(url, options)
            const data = await res.json()
            const mod = {
                mats: data.data,
                matDesabilitado: false
            }
            return setMateriais(modMaterial(c.props.matindex, mod))
        })();
    }

    const adicionaMaterial = () => {
        setMateriais(prev => [...prev, { 
            id: '',
            mats: [],
            quantidade: '',
            matDesabilitado: true,
            qtdDesabilitado: true,
            medida: '',
        }]);
    }

    const modMaterial = (matindex, values) => {

        let mats = [...materiais]
        let mat = {
            ...materiais[matindex],
            ...values
        }
        mats[matindex] = mat;
        return mats
    }

    const removeMaterial = (index) => {
        let tempArr = materiais;
        tempArr.splice(index, 1);
        setMateriais([...tempArr]);
    }
    // const setUnidadeMedida = (material) => {
    //     /* chamar api no set de dados */
    //     // console.log(materiais[material], material)
    //     // return materiais[material]['mats']['medida']
    //     switch (material.id) {
    //         case 1: return "CX";
    //         case 2: return "M³";
    //         case 3: return "MT";
    //         case 4: return "SC"
    //         case 5: return "UN"
    //         case 6: return "PC"
    //         default: return ""
    //     }
    // }

    const handleChange = (e, c) => {
        console.log(e, c)
        const mod = {
            qtdDesabilitado: false,
            medida: materiais[c.props.matindex]['mats'][c.props.mat]['medida'],
        }
        // const novoState = materiais.map((material, index) => {
        //     if (index === i) 
        //         return { ...material, [e.target.name]: e.target.value, qtdDesabilitado: false, medida: materiais[i.props.matindex]['mats'][i.props.mat]['medida']}

        //     return material;
        // });
        return setMateriais(modMaterial(c.props.matindex, mod));
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
        (async () => {
            const res = await fetch(url, options)
            const data = await res.json()
            setTipoDesabilitado(false)
            return setTiposMats(data)
        })();
    }, [])
    // useEffect(() => { }, [materiais.length])

    return (
        <Box className="mx-8 mb-12">
            <Typography sx={style.label} >
                {label}
            </Typography>

            <Paper sx={style.container} >
                {materiais.map((material, index) => {
                    return (
                        <Fade in={true} key={index} >
                            <Paper className="p-4 mb-4 flex gap-4">
                                <Selecao
                                    label="Tipo de material"
                                    name="tipo_material"
                                    size="small"
                                    onChange={getMateriaisFromTipos}
                                    disabled={tipoDesabilitado}
                                    defaultValue={null}
                                    fullWidth
                                >
                                    {
                                        tiposMats.data
                                            ?.map((val, i) => 
                                                <MenuItem value={val.id} matindex={`${index}`} key={i} >
                                                    {val.nome}
                                                </MenuItem>)
                                    }
                                </Selecao>

                                <Selecao
                                    /* desabilitado se valor anterior nao selecionado */
                                    label="Material"
                                    name="id"
                                    size="small"
                                    disabled={material.matDesabilitado}
                                    defaultValue={material.id}
                                    onChange={(e, c) => handleChange(e, c)}
                                    fullWidth
                                >
                                    {
                                    material.mats
                                        ?.map((val, matLoc) => 
                                            <MenuItem value={matLoc} matindex={index} mat={matLoc} key={matLoc}>
                                                {val.nome}
                                            </MenuItem>
                                            ) || null
                                    }
                                </Selecao>

                                <TextField
                                    /* desabilitado se valor anterior nao selecionado */
                                    name="quantidade"
                                    label="Quantidade"
                                    disabled={material.qtdDesabilitado}
                                    defaultValue={material.quantidade}
                                    // onChange={(e) => handleChange(e, index)}
                                    fullWidth
                                    size="small"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">{material.medida}</InputAdornment>,
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