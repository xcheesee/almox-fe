import React, { useEffect, useRef, useState } from 'react';
import {
    Typography,
    Paper,
    Fade,
    MenuItem,
    TextField,
    InputAdornment,
    Tooltip,
    Box,
    Button,
    FormGroup
} from '@mui/material';
import style from './style';
import AddIcon from '@mui/icons-material/Add';
import { getMatItens, getMatTipos, primeiraLetraMaiuscula } from '../../common/utils';
import { useQuery } from '@tanstack/react-query'
import MatListCard from '../MatListCard';
import { useAtom } from 'jotai';
import { matTipoListAtom } from '../../atomStore'

const BoxMateriais = (props) => {
    const {
        label,
        baseSelecionada = "",
        deptoSelecionado = "",
    } = props;

    const [newMats, setNewMats] = useAtom(matTipoListAtom)

    const [currMat, setCurrMat] = useState("")
    const [allMats, setAllMats] = useState([])
    const [isQtdError, setIsQtdError] = useState(false)
    const [isInListError, setIsInListError] = useState(false)
    const [tipoSelected, setTipoSelected] = useState(false)
    const [tipo, setTipo] = useState("")

    const firstLoad = useRef(true)

    useEffect(() => { 
        if(firstLoad.current) {
            setNewMats({})
            firstLoad.current = false
        }
    }, [])

    useEffect (() => {
        setCurrMat("")
        setAllMats([])
        setTipo("")
        setNewMats( prev => {
            const clearObj = {}
            for (const val in prev) {
                clearObj[val] = []
            }
            return clearObj
        })
    }, [deptoSelecionado])

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
        return setNewMats( prev => ({...prev, [tipoId]: matArray}) )
    }

    const getMateriaisFromTipos = async (children) => {
        setTipoSelected(false)
        const tipoRota = children.props.value;
        const val = await getMatItens(tipoRota, true, baseSelecionada, deptoSelecionado);
        setTipoSelected(true)
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
                    setIsInListError(false)

                    if (isQtdError) return

                    const formData = new FormData(e.target)
                    const qtd = formData.get('quantidade')

                    if(qtd > currMat.quantidade) return setIsQtdError(true)

                    let mats = [...newMats[currMat.tipo_item_id]]

                    if(mats.find(ele => ele.id === currMat.id)) return setIsInListError(true)

                    mats.push({...currMat, qtd: qtd})
                    setNewMats({...newMats, [currMat.tipo_item_id]: [...mats]})
                }}
            >
                <Paper sx={style.container} elevation={8}>
                    <Fade in={true} >
                        <Paper className="p-4 mb-4 flex gap-4 grid grid-cols-[2fr_1fr_max-content]" >
                            <Tooltip title={`${deptoSelecionado === "" ? "Selecione um departamento antes de adicionar materiais!" : ""}`} >
                                <FormGroup>
                                    <TextField
                                        select
                                        label="Tipo de material"
                                        name="tipo_material"
                                        size="small"
                                        value={tipo}    
                                        onChange={(v, c) => {
                                            getMateriaisFromTipos(c)
                                            setTipo(v.target.value)
                                            setCurrMat("")
                                        }}
                                        disabled={deptoSelecionado === "" || tiposMats?.isLoading}
                                        className="col-span-2"
                                        fullWidth
                                    >
                                        {
                                            tiposMats?.data 
                                                ? tiposMats?.data
                                                    ?.map((val, i) => 
                                                        <MenuItem value={val.id} key={i} >
                                                            {primeiraLetraMaiuscula(val.nome)}
                                                        </MenuItem>)
                                                :<MenuItem></MenuItem> 
                                        }
                                    </TextField>
                                </FormGroup>
                            </Tooltip>

                            {!tiposMats.isFetching ?
                                <Fade in={true} >
                                    <Box className='grid grid-cols-2 gap-4 row-start-2'>
                                        <Tooltip title={tipoSelected && allMats.length === 0 ? "Não há materiais desse tipo na base!" : ""}>
                                        <TextField
                                            select
                                            id="material-seletor"
                                            name="material"
                                            label="Material"
                                            defaultValue=""
                                            value={currMat}
                                            onChange={e => {
                                                setIsInListError(false)
                                                setCurrMat(e.target.value)
                                            }}
                                            disabled={allMats.length === 0 }
                                            size="small"
                                            error={isInListError}
                                            helperText={isInListError ? "Material ja se encontra na lista!" : ""}
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
                                        </Tooltip >

                                        <TextField
                                            /* desabilitado se valor anterior nao selecionado */
                                            name="quantidade"
                                            label="Quantidade"
                                            disabled={currMat === ""}
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
                            startIcon={ <AddIcon fontSize="small" /> } >
                            Adicionar material
                        </Button>
                    </Box>

                    { !tiposMats.isLoading 
                        ? Object.entries(newMats)?.map((keyVal, i) => { 
                            if (keyVal[1].length === 0) return <></>
                            return <MatListCard 
                                key={`tipo${keyVal[0]}-item${i}`} 
                                tipo={tiposMats?.data?.find(ele => +ele.id === +keyVal[0])} 
                                mats={keyVal[1]}
                                getMats={getMats} 
                                modSelectedMat={modSelectedMat}
                                delSelectedMat={delSelectedMat}
                            />
                        })
                        : <></> 
                    }
                </Paper>
            </Box>
        </Box>
    );
}

export default BoxMateriais;
