import React, { useState, useEffect } from 'react';
import { 
    Box,
    Typography,
    Paper,
    MenuItem,
    TextField,
    InputAdornment,
    Tooltip,
    IconButton,
    Button,
    Fade
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import style from '../BoxMateriais/style';
import Selecao from '../Selecao';
import { getMatItens, getMatTipos, primeiraLetraMaiuscula } from '../../common/utils';

const BoxMateriaisEntrada = ({ materiais, setMateriais }) => {
    const [tiposMats, setTiposMats] = useState({});
    const [carregando, setCarregando] = useState(true);
    const [listaMateriais, setListaMateriais] = useState([]);

    const getMateriaisFromTipos = async (e) => {
        const val = await getMatItens(e.target.value);
        setListaMateriais(val.data);
        
        return setMateriais([{
            id: '',
            matDesabilitado: false,
            mats: val.data,
            currMat: '',
            qtdDesabilitado: false,
            quantidade: '',
            medida: '',
        }]);
    };

    const adicionaMaterial = () => {
        setMateriais(prev => [...prev, { 
            id: '',
            matDesabilitado: false,
            mats: listaMateriais,
            currMat: '',
            qtdDesabilitado: false,
            quantidade: '',
            medida: '',
        }]);
    };

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
            id: materiais[formIndex]['mats'][materialIndex]['id'],
            currMat: materialAlvo,
        };
        return setMateriais(prev => modMaterial(prev, formIndex, mod))
    };

    const handleQtdChange = (element, formIndex) => {
        setMateriais(prev => modMaterial(prev, formIndex, {quantidade: element.target.value,}))
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
                Materiais entregues
            </Typography>

            <Selecao
                label="Tipo de material"
                name="tipo_material"
                size="small"
                onChange={(e) => { getMateriaisFromTipos(e); }}
                disabled={carregando}
                className="col-span-2"
                margin="dense"
                fullWidth
            >
                {
                    tiposMats.data?.map(val => 
                        <MenuItem value={val.id} key={val.id} >
                            {primeiraLetraMaiuscula(val.nome)}
                        </MenuItem>)
                }
            </Selecao>

            {materiais.length > 0 
                ?
                    <Fade in={true}>
                        <Paper sx={style.container} className="my-4" >
                            {materiais.map((material, index) => {
                                return (
                                    <Paper className="p-4 mb-4" key={index}>
                                        <Box className='grid grid-cols-[2fr_1fr_max-content] gap-4'>
                                            <Selecao
                                                label="Material"
                                                name="id"
                                                size="small"
                                                disabled={material.matDesabilitado}
                                                value={material.currMat}
                                                onChange={(e, c) => handleChange(e, c, index)}
                                            >
                                                {
                                                    material.mats?.map((val, matLoc) =>
                                                        <MenuItem value={matLoc} key={matLoc}>
                                                            {val.nome}
                                                        </MenuItem>)
                                                }
                                            </Selecao>

                                            <TextField
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
                                                    <IconButton 
                                                        onClick={() => removeMaterial(index)} 
                                                        disabled={index === 0}
                                                    >
                                                        <CloseIcon />
                                                    </IconButton>
                                                </Box>
                                            </Tooltip>

                                        </Box>
                                    </Paper>
                                )
                            })}

                            <Box className="self-end">
                                <Button onClick={adicionaMaterial} >
                                    <AddIcon fontSize="small" />
                                    Adicionar material
                                </Button>
                            </Box>
                        </Paper>
                    </Fade>
                :
                    ""
            }
        </Box>
    );
}

export default BoxMateriaisEntrada;