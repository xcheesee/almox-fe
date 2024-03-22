import React, { useState } from 'react';
import { 
    Badge,
    IconButton,
    Typography,
    Menu,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { getDados } from '../../common/utils';
import { useQuery } from '@tanstack/react-query'
import { useAuth, useAuthenticatedQuery } from '../../common/utils/hooks';

const MenuItemsAcabando = ({ username, style }) => {
    const { log_out } = useAuth()
    const itemsAcabando = useAuthenticatedQuery({
        queryKey: ['itemsAcabando'], 
        queryFn: async () => await getDados('items_acabando'),
    })

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <>
            <Badge
                badgeContent={itemsAcabando?.data?.length}
                variant="dot"
                color="error"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <IconButton 
                    className="flex items-center gap-1" 
                    sx={style.iconButton}
                    onClick={handleClick}
                    disabled={itemsAcabando?.data?.length === 0}
                >
                    <PersonIcon fontSize="small" sx={{ color: (theme) => theme.palette.color.bg }} />
                    <Typography>Olá, {username}</Typography>
                </IconButton>
            </Badge>

            <Menu
                id="lista-items-acabando"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Typography className="px-2 pb-2">
                    <strong>Itens a repor no estoque</strong>
                </Typography>

                <Typography className="px-4 pb-2">
                    Favor verificar as quantidades dos itens abaixo e solicitar o quanto antes a reposição destes itens
                </Typography>

                <TableContainer 
                    sx={{ margin: '0.5rem auto' }}
                >
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Item</TableCell>
                                <TableCell align='right'>Quantidade</TableCell>
                                <TableCell align='right'>Local</TableCell>
                            </TableRow>
                        </TableHead>
                            <TableBody>

                                {itemsAcabando.isLoading
                                    ?<></>
                                    :itemsAcabando?.data?.data?.map(item => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.item}</TableCell>
                                        <TableCell align='right'>{item.quantidade} {item.medida}</TableCell>
                                        <TableCell align='right'>{item.local}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                    </Table>
                </TableContainer>
            </Menu>
        </>
    );
}

export default MenuItemsAcabando;