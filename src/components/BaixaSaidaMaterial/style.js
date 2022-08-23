const style = {
    textoNegrito: {
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'column'
    },
    subTitulo: {
        color: (theme) => theme.palette.color.bg,
        fontWeight: 'light',
        fontSize: '1.3rem',
        mb: '0.5rem'
    },
    box: { margin: '2rem' },
    span: { ml: '0.5rem' },
    paperBg: {
        background: (theme) => theme.palette.color.bgInterno,
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    paperMaterial: {
        padding: '1rem',
    }
}

export default style;