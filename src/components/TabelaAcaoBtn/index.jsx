import { Box, IconButton, Tooltip } from "@mui/material";

export default function TabelaAcaoBtn({
    display="", 
    title, 
    placement, 
    disabled, 
    onClick, 
    className,
    children
}) {
    return (
        <Box sx={{display: display}} className={className}>
            <Tooltip title={title} placement={placement} >
                <Box>
                    <IconButton 
                        disabled={disabled}
                        onClick={onClick}
                    >
                        { children }
                    </IconButton>
                </Box>
            </Tooltip>
        </Box>
    )
}