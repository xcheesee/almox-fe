import React, { useState } from 'react';
import {
    Typography,
    Paper,
    Fade,
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

export default function BoxProfissionais ({
    label,
    //baseSelecionada="",
    //deptoSelecionado="",
    //errors={},
    defaultValue=[],
    name="",
}) {

    const inputTags = {
        nome: "nome",
        data_inicio: "data_inicio",
        horas_empregadas: "horas_empregadas"
    }

    const [inputErrors, setInputErrors] = useState({});

    const [profissionais, setProfissionais] = useState(defaultValue ?? [])
    const inputData = JSON.stringify(profissionais)

    function cadastraProfissional() {
        const nomeNode = document.getElementById(inputTags.nome);
        const dataNode = document.getElementById(inputTags.data_inicio);
        const horaNode = document.getElementById(inputTags.horas_empregadas);

        const profissional = {
            nome: nomeNode.value,
            data_inicio: dataNode.value,
            horas_empregadas: horaNode.value
        };

        if(isBlankField(profissional)) return;

        setProfissionais( prev => ([...prev, profissional]) );

        nomeNode.value = "";
        dataNode.value = "";
        horaNode.value = "";
    }

    function handleChange (element, formIndex) {
        const mod = { [element.currentTarget.dataset.field]: element.target.value }

        return setProfissionais(prev => modProfissional(prev, formIndex, mod))
    }

    function isBlankField (profissional) {
        const entries = Object.entries(profissional)
        let errors = {}

        for(let keyValue of entries) {
            if(!keyValue[1] || keyValue[1] === "") {
                errors[keyValue[0]] = true
            }
        }

        setInputErrors(errors)

        return Object.keys(errors).length !== 0
    }

    const modProfissional = (profissionaisEmpregados, formIndex, values) => {
        let profs = [...profissionaisEmpregados]
        let prof = {
            ...profs[formIndex],
            ...values,
        }
        profs[formIndex] = prof
        return profs
    }

    const removeProfissional = (index) => {
        let tempArr = [...profissionais]
        tempArr.splice(index, 1);
        setProfissionais(tempArr);
    } 

    return (
        <Box className="lg:mx-8 mb-12">
            <Typography sx={style.label} >
                {label}
            </Typography>

            <Paper sx={style.container} >
                <Fade in={true}>
                    <Paper className='p-4 mb-4 gap-4 grid lg:grid-cols-[3fr_2fr_1fr]' id="profs-container">
                        {/** Campo utilizado para manter a lista de profissionais e disponibiliza-la quando chamada pelo metodo onSubmit */}
                        <input type="text" name={name} hidden readOnly value={inputData} />

                        <TextField
                            label="Nome"
                            id={inputTags.nome}
                            size="small"
                            error={inputErrors[inputTags.nome]}
                            helperText={inputErrors[inputTags.nome] ? "Defina um profissional" : ""}
                            InputLabelProps={{ shrink: true }}
                            className=""
                            fullWidth
                        />

                        <TextField
                            type='date'
                            id={inputTags.data_inicio}
                            label="Data de Inicio"
                            InputLabelProps={{ shrink: true }}
                            error={inputErrors[inputTags.data_inicio]}
                            helperText={inputErrors[inputTags.data_inicio] ? "Defina a data de inicio" : ""}
                            fullWidth
                            size="small"
                        />

                        <TextField
                            id={inputTags.horas_empregadas}
                            label="Horas Empregadas"
                            fullWidth
                            size="small"
                            error={inputErrors[inputTags.horas_empregadas]}
                            helperText={inputErrors[inputTags.horas_empregadas] ? "Defina as horas empregadas" : ""}
                            InputProps={{ 
                                endAdornment: <InputAdornment position="end">h</InputAdornment>,
                            }}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Paper>
                </Fade>

                <Box className="self-end">
                    <Button onClick={cadastraProfissional}>
                        <AddIcon fontSize="small" />
                        Adicionar Profissional
                    </Button>
                </Box>

                <Typography className='pb-4'>{profissionais.length} Empregado(s)</Typography>

                {profissionais?.map((profissional, index) => (
                    <Fade in={true} key={`prof-${index}`} >
                        <Paper className="p-4 mb-4 gap-4 grid lg:grid-cols-[3fr_2fr_1fr_max-content]" >
                            <TextField
                                label="Nome"
                                data-field={inputTags.nome}
                                inputProps={{'data-field': inputTags.nome}}
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) => handleChange(e, index)}
                                value={profissional?.nome ?? ""}
                                className=""
                                fullWidth
                            />

                                <TextField
                                    type='date'
                                    inputProps={{'data-field': inputTags.data_inicio}}
                                    label="Data de Inicio"
                                    InputLabelProps={{ shrink: true }}
                                    value={profissional?.data_inicio ?? ""}
                                    onChange={e => handleChange(e, index)}
                                    fullWidth
                                    size="small"
                                />

                                <TextField
                                    inputProps={{'data-field': inputTags.horas_empregadas}}
                                    label="Horas Empregadas"
                                    value={profissional?.horas_empregadas ?? ""}
                                    onChange={e => handleChange(e, index)}
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    size="small"
                                    InputProps={{ endAdornment: <InputAdornment position="end">h</InputAdornment> }}
                                />

                            <Tooltip title="Remover" placement="right">
                                <Box className='self-center flex max-lg:justify-center max-lg:rounded'>
                                    <IconButton onClick={() => removeProfissional(index)} className='w-full !rounded  max-lg:!bg-red-500 max-lg:hover:!bg-red-700'>
                                        <CloseIcon className='max-lg:text-white' />
                                    </IconButton>
                                </Box>
                            </Tooltip>
                        </Paper>
                    </Fade>
                    )
                )}
            </Paper>
        </Box>
    );
}