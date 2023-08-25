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
    Button
} from '@mui/material';
import style from './style';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useQuery } from '@tanstack/react-query';
import { getProfissionais } from '../../common/utils';
import { useAtom, useSetAtom } from 'jotai';
import { profissionaisAtom } from '../../atomStore';

export default function BoxProfissionais ({
    label,
    defaultValue=null,
    baseSelecionada="",
    deptoSelecionado="",
}) {
    const profissionaisDisponiveis = useQuery({
        queryFn: () => getProfissionais(baseSelecionada, deptoSelecionado),
        queryKey: ['profissinaisDisponiveis', baseSelecionada, deptoSelecionado]
    })

    //reseta o valor do store de profissionais caso for a primeira renderizacao e nao houver valores previos 
    const firstLoad = useRef(true)

    useEffect(() => {
        if(firstLoad.current && !defaultValue) {
            firstLoad.current = false
            setProfissionais([])
        }
    })

    const [currProfissional, setCurrProfissional] = useState({
        id: "",
        nome: "",
        data_inicio: "",
        horas_empregadas: ""

    })

    const [profissionais, setProfissionais] = useAtom(profissionaisAtom)

    function handleChange (element, formIndex) {
        const mod = {
            [element.target.name]: element.target.value
        }
        return setProfissionais(prev => {
            const newArr = modProfissional(prev, formIndex, mod)
            return [...newArr]
        })
    }

    function adicionaProfissional (profissional) {
         setProfissionais(prev => {
            const newArr = [...prev, {...profissional}]
            return [...newArr]
        })
    }

    const modProfissional = (profissionaisEmpregados, formIndex, values) => {
        let profs = [...profissionaisEmpregados]
        let prof = {
            ...profissionaisEmpregados[formIndex],
            ...values,
        }
        profs[formIndex] = {...prof}
        return [...profs]
    }

    const removeProfissional = (index) => {
        let tempArr = profissionais
        tempArr.splice(index, 1);
        //setProfissionaisEmpregados([...tempArr])
        setProfissionais([...tempArr])
    } 

    return (
        <Box className="mx-8 mb-12">
            <Typography sx={style.label} >
                {label}
            </Typography>

            <Paper sx={style.container} >
                <Fade in={true}>
                    <Paper className='p-4 mb-4 flex gap-4 grid grid-cols-[2fr_1fr_max-content]'>
                        <TextField
                            select
                            label="Nome"
                            name="id"
                            size="small"
                            onChange={e => setCurrProfissional( prev => ({...prev, id:e.target.value}) )}
                            disabled={!profissionaisDisponiveis?.data}
                            value={currProfissional.id}
                            className="col-span-2"
                            fullWidth
                        >
                            {
                                profissionaisDisponiveis?.data?.data ?
                                profissionaisDisponiveis?.data?.data
                                    ?.map((val, i) => 
                                        <MenuItem value={val.id} prof-index={val.id} key={i} >
                                            {val.nome}
                                        </MenuItem>)
                                : <MenuItem></MenuItem>
                            }

                        </TextField>
                        <Box className='grid grid-cols-[max-content_max-content] gap-4'>
                            <TextField
                                type='date'
                                name="data_inicio"
                                label="Data de Inicio"
                                InputLabelProps={{ shrink: true }}
                                value={currProfissional.data_inicio}
                                onChange={e => setCurrProfissional(prev => ({...prev, data_inicio:e.target.value}) )}
                                fullWidth
                                size="small"
                            />

                            <TextField
                                name="horas_empregadas"
                                label="Horas Empregadas"
                                value={currProfissional.horas_empregadas}
                                onChange={e => setCurrProfissional( prev => ({...prev, horas_empregadas:e.target.value}) )}
                                fullWidth
                                size="small"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">h</InputAdornment>,
                                }}
                            />
                        </Box>
                    </Paper>
                </Fade>
                <Box className="self-end">
                    <Button onClick={() => {
                        setProfissionais(prev => {
                            const newArr = [...prev, {...currProfissional}]
                            return [...newArr]
                        })

                        setCurrProfissional({
                            id: "",
                            nome: "",
                            horas_empregadas: "",
                            data_inicio: ""
                        })
                    }}>
                        <AddIcon fontSize="small" />
                        Adicionar Profissional
                    </Button>
                </Box>

                {profissionais?.map((profissional, index) => {
                    return (
                        <Fade in={true} key={index} >
                            <Paper className="p-4 mb-4 flex gap-4 grid grid-cols-[2fr_1fr_max-content]" key={`${index}paper`}>
                                <TextField
                                    select
                                    label="Nome"
                                    name="id"
                                    size="small"
                                    onChange={(e) => handleChange(e, index)}
                                    disabled={!profissionaisDisponiveis?.data}
                                    value={profissional.id}
                                    className="col-span-2"
                                    fullWidth
                                >
                                    {
                                        profissionaisDisponiveis?.data?.data 
                                        ?profissionaisDisponiveis?.data?.data
                                            ?.map((val, i) => 
                                                <MenuItem value={val.id} prof-index={val.id} key={i} >
                                                    {val.nome}
                                                </MenuItem>)
                                        : <MenuItem></MenuItem>
                                    }
                                </TextField>

                                <Fade in={true} key={`${index}a`} >
                                    <Box className='grid grid-cols-[max-content_max-content] gap-4'>
                                        <TextField
                                            type='date'
                                            name="data_inicio"
                                            label="Data de Inicio"
                                            InputLabelProps={{ shrink: true }}
                                            value={profissional.data_inicio}
                                            onChange={e => handleChange(e, index)}
                                            fullWidth
                                            size="small"
                                        />

                                        <TextField
                                            name="horas_empregadas"
                                            label="Horas Empregadas"
                                            value={profissional.horas_empregadas}
                                            onChange={e => handleChange(e, index)}
                                            fullWidth
                                            size="small"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">h</InputAdornment>,
                                            }}
                                        />
                                    </Box>
                                </Fade>

                                <Tooltip title="Remover" placement="right">
                                    <Box className='col-start-4 row-span-full self-center'>
                                        <IconButton onClick={() => removeProfissional(index)}>
                                            <CloseIcon />
                                        </IconButton>
                                    </Box>
                                </Tooltip>
                            </Paper>
                        </Fade>
                    );
                })}
            </Paper>
        </Box>
    );
}