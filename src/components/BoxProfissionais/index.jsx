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
        const mod = { [element.target.fieldname]: element.target.value }

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
        let profs = profissionaisEmpregados
        let prof = {
            ...profs[formIndex],
            ...values,
        }
        profs[formIndex] = prof
        return profs
    }

    const removeProfissional = (index) => {
        let tempArr = profissionais
        tempArr.splice(index, 1);
        setProfissionais(tempArr)
    } 

    return (
        <Box className="mx-8 mb-12">
            <Typography sx={style.label} >
                {label}
            </Typography>

            <Paper sx={style.container} >
                <Fade in={true}>
                    <Paper className='p-4 mb-4 gap-4 grid grid-cols-[3fr_1fr_2fr]' id="profs-container">
                        {/** Campo utilizado para manter a lista de profissionais e disponibiliza-la quando chamada pelo metodo onSubmit */}
                        <input type="text" name={name} hidden readOnly value={inputData} />

                        <TextField
                            label="Nome"
                            id={inputTags.nome}
                            size="small"
                            error={inputErrors[inputTags.nome]}
                            helperText={inputErrors[inputTags.nome] ? "Defina um profissional" : ""}
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
                            InputProps={{ endAdornment: <InputAdornment position="end">h</InputAdornment> }}
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
                        <Paper className="p-4 mb-4 gap-4 grid grid-cols-[2fr_1fr_max-content]" >
                            <TextField
                                label="Nome"
                                fieldname={inputTags.nome}
                                size="small"
                                onChange={(e) => handleChange(e, index)}
                                value={profissional?.nome ?? ""}
                                className="col-span-2"
                                fullWidth
                            />

                            <Box className='grid grid-cols-[max-content_max-content] gap-4'>
                                <TextField
                                    type='date'
                                    fieldname={inputTags.data_inicio}
                                    label="Data de Inicio"
                                    InputLabelProps={{ shrink: true }}
                                    value={profissional?.data_inicio ?? ""}
                                    onChange={e => handleChange(e, index)}
                                    fullWidth
                                    size="small"
                                />

                                <TextField
                                    fieldname={inputTags.horas_empregadas}
                                    label="Horas Empregadas"
                                    value={profissional?.horas_empregadas ?? ""}
                                    onChange={e => handleChange(e, index)}
                                    fullWidth
                                    size="small"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">h</InputAdornment>,
                                    }}
                                />
                            </Box>

                            <Tooltip title="Remover" placement="right">
                                <Box className='col-start-4 row-span-full self-center'>
                                    <IconButton onClick={() => removeProfissional(index)}>
                                        <CloseIcon />
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