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
    Button
} from '@mui/material';
import style from './style';
import Selecao from '../Selecao';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { getProfissionais } from '../../common/utils';

const BoxProfissionais = (props) => {
    const {
        label,
        profissionaisEmpregados,
        setProfissionaisEmpregados,
        baseSelecionada,
        deptoSelecionado,
    } = props;
    // const [carregando, setCarregando] = useState(true);
   
    const [profissionaisDisponiveis, setProfissionaisDisponiveis] = useState()

    const setProfissionais = async (base, depto) => {
        return await getProfissionais (base, depto)
    }

    const handleChange = (element, formIndex) => {
        const mod = {
            [element.target.name]: element.target.value
        }
        return setProfissionaisEmpregados(prev => modProfissional(prev, formIndex, mod))
    }

    const adicionaProfissional = () => {
        setProfissionaisEmpregados(prev => [...prev, {
            nome: '',
            dataInicio: '',
            horasEmpregadas: '',
        }])
    }

    const modProfissional = (profissionaisEmpregados, formIndex, values) => {
        let profs = [...profissionaisEmpregados]
        let prof = {
            ...profissionaisEmpregados[formIndex],
            ...values,
        }
        profs[formIndex] = prof
        return profs
    }

    const removeProfissional = (index) => {
        let tempArr = profissionaisEmpregados
        tempArr.splice(index, 1);
        setProfissionaisEmpregados([...tempArr])
    } 

    useEffect(() => {
        (async () => {
            const data = await setProfissionais(baseSelecionada, deptoSelecionado)
            setProfissionaisDisponiveis(data);
        })();
    }, [])

    return (
        <Box className="mx-8 mb-12">
            <Typography sx={style.label} >
                {label}
            </Typography>

            <Paper sx={style.container} >
                {profissionaisEmpregados.map((profissional, index) => {
                    return (
                        <Fade in={true} key={index} >
                            <Paper className="p-4 mb-4 flex gap-4 grid grid-cols-[max-content_1fr_1fr_max-content]" key={`${index}paper`}>
                                <Selecao
                                    label="Nome"
                                    name="nome"
                                    size="small"
                                    onChange={(e) => handleChange(e, index)}
                                    // disabled={carregando}
                                    value={profissional.nome}
                                    className="col-span-2"
                                    fullWidth
                                >
                                    {
                                        profissionaisDisponiveis
                                            ?.map((val, i) => 
                                                <MenuItem value={val} key={i} >
                                                    {val}
                                                </MenuItem>)
                                    }
                                </Selecao>
                                {
                                    profissional.nome !== ""
                                        ?<Fade in={true} key={`${index}a`} >
                                            <Box className='grid grid-cols-[max-content_max-content] gap-4'>
                                                <TextField
                                                    type='datetime-local'
                                                    name="dataInicio"
                                                    label="Data de Inicio"
                                                    InputLabelProps={{ shrink: true }}
                                                    value={profissional.dataInicio}
                                                    onChange={e => handleChange(e, index)}
                                                    fullWidth
                                                    size="small"
                                                />

                                                <TextField
                                                className=''
                                                    name="horasEmpregadas"
                                                    label="Horas Empregadas"
                                                    value={profissional.horasEmpregadas}
                                                    onChange={e => handleChange(e, index)}
                                                    fullWidth
                                                    size="small"
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end">h</InputAdornment>,
                                                    }}
                                                />
                                            </Box>
                                        </Fade>
                                        : ""
                            }
                                <Tooltip title="Remover" placement="right">
                                    <Box className='col-start-4 row-span-full self-center'>
                                        <IconButton onClick={() => removeProfissional(index)} disabled={index === 0}>
                                            <CloseIcon />
                                        </IconButton>
                                    </Box>
                                </Tooltip>
                            </Paper>
                        </Fade>
                    );
                })}

                <Box className="self-end">
                    <Button onClick={adicionaProfissional} >
                        <AddIcon fontSize="small" />
                        Adicionar Profissional
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

export default BoxProfissionais;