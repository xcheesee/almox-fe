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
import { getMatItens, getMatTipos, primeiraLetraMaiuscula, token } from '../../common/utils';
import { useState } from 'react';

const BoxMateriais = (props) => {
    const {
        label,
        materiais,
        setMateriais,
    } = props;
    const [tiposMats, setTiposMats] = useState({});
    const [carregando, setCarregando] = useState(true);

    const getMateriaisFromTipos = async (element, children, formIndex) => {
        const tipoRota = children.props.value;
        const tipoId = element.target.value;
        setMateriais(prev => modMaterial(prev, formIndex, {matDesabilitado: true}));
        
        const val = await getMatItens(tipoRota);
        const mod = {
            mats: val.data,
            tipo: tipoId,
            currMat: '',
            quantidade: '',
            medida: '',
            matDesabilitado: false
        };
        return setMateriais(prev => modMaterial(prev, formIndex, mod))
    };

    const adicionaMaterial = () => {
        setMateriais(prev => [...prev, { 
            id: '',
            tipo: '',
            matDesabilitado: true,
            mats: [],
            currMat: '',
            qtdDesabilitado: true,
            quantidade: '',
            medida: '',
        }]);
    };

    //recebe o array material, o indice do form a ser modificado e um objeto com as modificacoes a serem feitas
    const modMaterial = (materiais, formIndex, values) => {
        let mats = [...materiais];
        let mat = {
            ...materiais[formIndex],
            ...values
        };
        mats[formIndex] = mat;
        return mats
    };

    const removeMaterial = (index) => {
        let tempArr = materiais;
        tempArr.splice(index, 1);
        setMateriais([...tempArr]);
    };

    const handleChange = (element, children, formIndex) => {
        const materialIndex = children.props.value;
        const materialAlvo = element.target.value;
        const mod = {
            qtdDesabilitado: false,
            medida: materiais[formIndex]['mats'][materialIndex]['medida'],
            currMat: materialAlvo,
        };
        return setMateriais(prev => modMaterial(prev, formIndex, mod))
    };

    const handleQtdChange = (element, formIndex) => {
        setMateriais(prev => modMaterial(prev, formIndex, {quantidade: element.target.value,}))
        return console.log(materiais[formIndex])
    };
    

    useEffect(() => {
        (async () => {
            const data = await getMatTipos();
            setTiposMats(data);
            setCarregando(false);
        })();
    }, [])

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
                                    onChange={(e, c) => getMateriaisFromTipos(e, c, index)}
                                    disabled={carregando}
                                    value={material.tipo}
                                    fullWidth
                                >
                                    {
                                        tiposMats.data
                                            ?.map((val, i) => 
                                                <MenuItem value={val.id} key={i} >
                                                    {primeiraLetraMaiuscula(val.nome)}
                                                </MenuItem>)
                                    }
                                </Selecao>

                                <Selecao
                                    /* desabilitado se valor anterior nao selecionado */
                                    label="Material"
                                    name="id"
                                    size="small"
                                    disabled={material.matDesabilitado}
                                    value={material.currMat}
                                    onChange={(e, c) => handleChange(e, c, index)}
                                    fullWidth
                                >
                                    {
                                    material.mats
                                        ?.map((val, matLoc) => 
                                            <MenuItem value={matLoc} key={matLoc}>
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
                                    value={material.quantidade}
                                    onChange={(e) => handleQtdChange(e, index)}
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