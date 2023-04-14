import React, { useEffect, useRef, useState } from 'react';
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
import { useAtom } from 'jotai';
import { matTipoListAtom } from '../../atomStore'

const BoxMateriais = (props) => {
    const {
        label,
        baseSelecionada,
        deptoSelecionado,
    } = props;

    const [newMats, setNewMats] = useAtom(matTipoListAtom)

    const [currMat, setCurrMat] = useState("")
    const [allMats, setAllMats] = useState([])
    const [isQtdError, setIsQtdError] = useState(false)

    useEffect(() => { setNewMats({})}, [])

    const tiposMats = useQuery(['tiposMateriais'], getMatTipos, {
        onSuccess: res => {
            res.forEach( tipo => setNewMats(prev => ({...prev, [tipo.id]: []})) )
        }
    });

    function delSelectedMat (tipoId, matIndex) {
        let mats = newMats[tipoId]
        mats.splice(matIndex, 1)
        setNewMats( prev => ({...prev, [tipoId]: mats}) )
    }

    function modSelectedMat (matObj, tipoId, matIndex) {
        let matArray = newMats[tipoId]
        matArray[matIndex] = matObj
        setNewMats( prev => ({...prev, [tipoId]: matArray}) )
    }

    const getMateriaisFromTipos = async (element, children, formIndex = 0) => {
        const tipoRota = children.props.value;
        const val = await getMatItens(tipoRota, true, baseSelecionada, deptoSelecionado);
        return setAllMats(val.data)
    };

    async function getMats (tipoId) {
        return await getMatItens(tipoId, true, baseSelecionada, deptoSelecionado)
    }

    return (
        <Box className="mx-8 mb-12">
            <Typography sx={style.label} >
                {label}
            </Typography>

            <Box component="form"
                onSubmit={e => {
                    e.preventDefault()
                    if (isQtdError) return
                    const formData = new FormData(e.target)
                    const qtd = formData.get('quantidade')
                    const mats = newMats[currMat.tipo_item_id]
                    mats.push({...currMat, qtd: qtd})
                    setNewMats(prev => ({...prev, [currMat.tipo_item_id]: mats}))
                }}
            >
                <Paper sx={style.container} >
                    <Fade in={true} >
                        <Paper className="p-4 mb-4 flex gap-4 grid grid-cols-[2fr_1fr_max-content]" >
                            <Tooltip title={`${deptoSelecionado === "" ? "Selecione um departamento antes de adicionar materiais!" : ""}`} >
                                <FormGroup>
                                    <Selecao
                                        label="Tipo de material"
                                        name="tipo_material"
                                        size="small"
                                        onChange={(e, c) => {
                                            getMateriaisFromTipos(e, c)
                                            setCurrMat("")
                                        }}
                                        carregando={tiposMats?.isLoading}
                                        disabled={deptoSelecionado === ""}
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
                            {!tiposMats.isFetching ?
                                <Fade in={true} >
                                    <Box className='grid grid-cols-2 gap-4 row-start-2'>
                                        <TextField
                                            select
                                            id="material-seletor"
                                            name="material"
                                            label="Material"
                                            defaultValue=""
                                            value={currMat}
                                            onChange={e => {setCurrMat(e.target.value)}}
                                            //disabled={material.matDesabilitado}
                                            size="small"
                                            fullWidth
                                        >
                                            {
                                                allMats
                                                ?.map((val, index) =>
                                                    <MenuItem value={val} key={index} className="flex justify-between">
                                                        {val.nome}
                                                    </MenuItem>
                                                )
                                            }
                                        </TextField >

                                        <TextField
                                            /* desabilitado se valor anterior nao selecionado */
                                            name="quantidade"
                                            label="Quantidade"
                                            //disabled={material.qtdDesabilitado}
                                            fullWidth
                                            size="small"
                                            InputProps={{ endAdornment: <InputAdornment position="end"> { currMat !== "" ? `/ ${currMat.quantidade} ${currMat.medida}` : "" } </InputAdornment>, }}
                                            onChange={(e) => e.target.value > currMat.quantidade ? setIsQtdError(true) : setIsQtdError(false) } 
                                            error={ isQtdError }
                                            helperText={ isQtdError ? 'Quantidade usada não pode exceder a quantidade em estoque.' : '' }
                                        />
                                    </Box>
                                </Fade>
                                : ""
                            }
                        </Paper>
                    </Fade>
                    <Box className="self-end">
                        <Button type="submit" 
                            //onClick={adicionaMaterial}
                            startIcon={ <AddIcon fontSize="small" /> } >
                            Adicionar material
                        </Button>
                    </Box>
                    { !tiposMats.isLoading 
                        ? Object.entries(newMats)?.map((keyVal, i) => { 
                            if (keyVal[1].length === 0) return 
                            return <MatListCard 
                                key={`tipo${keyVal[0]}-item${i}`} 
                                getMats={getMats} 
                                tipo={tiposMats?.data?.find(ele => ele.id == `${keyVal[0]}`)} 
                                mats={keyVal[1]}
                                modSelectedMat={modSelectedMat}
                                delSelectedMat={delSelectedMat}
                            />
                        })
                        : ""
                    }
                </Paper>
            </Box>
        </Box>
    );
}

export default BoxMateriais;
