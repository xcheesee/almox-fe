const style = {
    iconButton: { 
        borderRadius: 1, 
        boxSizing: 'border-box', 
        margin: '1rem 0',
        padding: '0.5rem'
    },
    badge: {
        display: 'flex',
        alignItems: 'center'
    },
    labelBotao: { 
        fontSize: '1.25rem', 
        mr: '0.5rem',
        ml: '0.5rem', 
        display: 'flex', 
        alignItems: 'center',
    },
    tuneIcon: { mr: '0.2rem' },
    expandIcon: { mr: '0.5rem' },
    containerFiltros: { 
        display: 'flex',
        flexDirection: 'column',
        margin: '2rem auto',
        mt: 0,
        padding: '2rem',
        border: '1px solid #cdcdcd', 
        borderRadius: '3px',
        width: '80%'
    },
    gridFiltro: { 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '2rem' 
    },
    containerBotoes: { 
        alignSelf: 'end', 
        mt: '2rem',
        display: 'flex',
        gap: '1rem'
    },
}

export default style;