export default function ProfissionalList({ profissionais, onChange }) {
    return (
        <>
            <Typography className='pb-4'>{profissionais.length} Empregado(s)</Typography>

            {profissionais?.map((profissional, index) => (
                <Fade in={true} key={`prof-${index}`} >
                    <Paper className="p-4 mb-4 gap-4 grid lg:grid-cols-[3fr_2fr_1fr_max-content]" >
                        <TextField
                            label="Nome"
                            data-field={inputTags.nome}
                            inputProps={{ 'data-field': inputTags.nome }}
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            onChange={(e) => handleChange(e, index)}
                            value={profissional?.nome ?? ""}
                            className=""
                            fullWidth
                        />

                        <TextField
                            type='date'
                            inputProps={{ 'data-field': inputTags.data_inicio }}
                            label="Data de Inicio"
                            InputLabelProps={{ shrink: true }}
                            value={profissional?.data_inicio ?? ""}
                            onChange={e => handleChange(e, index)}
                            fullWidth
                            size="small"
                        />

                        <TextField
                            inputProps={{ 'data-field': inputTags.horas_empregadas }}
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
            )}</>)

}
