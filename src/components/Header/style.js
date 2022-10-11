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
    iconButton: { 
        borderRadius: 1, 
        boxSizing: 'border-box',
        padding: '0.2rem 0.5rem'
    },
}

export default style;