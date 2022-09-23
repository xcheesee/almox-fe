const style = {
    header: { 
        color: (theme) => theme.palette.color.bg,
        minHeight: '3.25rem'
    },
    logo: { 
        fontSize: '1.5rem',
        '&:hover': { cursor: 'pointer' } 
    },
    gridAlt: { 
        display: 'grid', 
        gridTemplateColumns: '1fr', 
        gap: '2rem',
        padding: '1em 0.5em'
    },
}

export default style;