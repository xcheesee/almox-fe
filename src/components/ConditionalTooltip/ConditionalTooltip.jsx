import { Tooltip } from "@mui/material"

export default function ConditionalTooltip({enabled, texto, children}) {
    if(!enabled) return children
    return (
        <Tooltip title={texto}>
            {children}
        </Tooltip>
    )
}