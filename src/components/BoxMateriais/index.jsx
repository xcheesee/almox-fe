import React, { useEffect, useState } from 'react';
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
    Button,
    FormGroup
} from '@mui/material';
import style from './style';
import Selecao from '../Selecao';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { getMatItens, getMatTipos, primeiraLetraMaiuscula } from '../../common/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query'
import MatListCard from '../MatListCard';

const BoxMateriais = (props) => {
    const tiposMats = useQuery(['tiposMateriais'], getMatTipos);
    const [newMats, setNewMats] = useState({
        "1":[{
                id: 1,
                quantidade: 2,
                medidaId: 3,
            },
            {
                id: 2,
                quantidade: 1,
                medidaId: 1,
            }
        ],
        "2": [{
                id:2,
                quantidade: 2,
                medidaId: 6,
            },
            {
                id:3,
                quantidade: 6,
                medidaId: 7,
            },
        ]
    })
                
    

    const {
        label,
        materiais,
        setMateriais,
        baseSelecionada,
        deptoSelecionado,
    } = props;

    const getMateriaisFromTipos = async (element, children, formIndex) => {
        const tipoRota = children.props.value;
        const tipoAlvoId = element.target.value;
        setMateriais(prev => modMaterial(prev, formIndex, {matDesabilitado: true}));

        const val = await getMatItens(tipoRota, true, baseSelecionada, deptoSelecionado);
        const mod = {
            mats: val.data,
            tipo: tipoAlvoId,
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
            id: materiais[formIndex]['mats'][materialIndex]['id'],
            currMat: materialAlvo,
        };

        return setMateriais(prev => modMaterial(prev, formIndex, mod))
    };

    const handleQtdChange = (element, formIndex) => {
        setMateriais(prev => modMaterial(prev, formIndex, {quantidade: element.target.value,}))
    };

    return (
        <Box className="mx-8 mb-12">
            <Typography sx={style.label} >
                {label}
            </Typography>

            <Paper sx={style.container} >
                {materiais.map((material, index) => {
                    return (
                        <Fade in={true} key={index} >
                            <Paper className="p-4 mb-4 flex gap-4 grid grid-cols-[2fr_1fr_max-content]" key={`${index}paper`} >
                                <Tooltip title={`${deptoSelecionado === "" ? "Selecione um departamento antes de adicionar materiais!" : ""}`} >
                                    <FormGroup>
                                        <Selecao
                                            label="Tipo de material"
                                            name="tipo_material"
                                            size="small"
                                            onChange={(e, c) => getMateriaisFromTipos(e, c, index)}
                                            carregando={tiposMats?.isLoading}
                                            disabled={deptoSelecionado === ""}
                                            value={material.tipo}
                                            className="col-span-2"
                                            fullWidth
                                        >
                                            {
                                                tiposMats?.data
                                                ?.map((val, i) => 
                                                    <MenuItem value={val.id} key={i} >
                                                        {primeiraLetraMaiuscula(val.nome)}
                                                    </MenuItem>)
                                            }
                                        </Selecao>
                                    </FormGroup>
                                </Tooltip>
                                    <Fade in={true} key={`${index}a`} >
                                        <Box className='grid grid-cols-2 gap-4 row-start-2'>
                                            <Selecao
                                                /* desabilitado se valor anterior nao selecionado */
                                                label="Material"
                                                name="id"
                                                size="small"
                                                carregando={material.matDesabilitado}
                                                value={material.currMat}
                                                onChange={(e, c) => handleChange(e, c, index)}
                                                className="col-span-2"
                                                fullWidth
                                            >
                                                {
                                                    material.mats
                                                    ?.map((val, matLoc) =>
                                                        <MenuItem value={matLoc} key={matLoc} className="flex justify-between">
                                                            {val.nome}
                                                        </MenuItem>
                                                    )
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
                                                    endAdornment: 
                                                    <InputAdornment position="end">
                                                        {
                                                            material.currMat !== ""
                                                                ? `/ ${material.mats[material.currMat].quantidade} ${material.medida}`
                                                                : ""
                                                        }
                                                    </InputAdornment>,
                                                }}
                                                error={material.quantidade > material.mats[material.currMat]?.quantidade}
                                                helperText={
                                                    material.quantidade > material.mats[material.currMat]?.quantidade
                                                        ? 'Quantidade usada não pode exceder a quantidade em estoque.'
                                                        : ''
                                                }
                                            />
                                        </Box>
                                    </Fade>
                                <Tooltip title="Remover" placement="right">
                                    <Box className='col-start-3 row-span-full self-center'>
                                        <IconButton onClick={() => removeMaterial(index)} disabled={index === 0}>
                                            <CloseIcon />
                                        </IconButton>
                                    </Box>
                                </Tooltip>
                            </Paper>
                        </Fade>
                    );
                })}
                { !tiposMats.isLoading 
                    ? Object.entries(newMats)?.map((keyVal, i) => { 
                        console.log(keyVal)
                    return <MatListCard key={`tipo${keyVal[0]}-item${i}`} tipo={tiposMats?.data?.find(ele => ele.id == `${keyVal[0]}`)} mats={keyVal[1]}/>
                    })
                    : ""
                }
                <Box className="self-end">
                    <Button onClick={adicionaMaterial} startIcon={ <AddIcon fontSize="small" /> } >
                        Adicionar material
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

export default BoxMateriais;
