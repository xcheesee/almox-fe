import React, { useState } from 'react';
import { Box } from '@mui/material';
import Inventario from '../components/Inventario';
import DialogDefinirAlerta from '../components/DialogDefinirAlerta';
import { getRegistro } from '../common/utils';
import { useSetAtom } from 'jotai';
import { snackbarAtom } from '../atomStore';

const PaginaInventario = () => {

    const [registro, setRegistro] = useState({});
    const [openDefinir, setOpenDefinir] = useState(false);
    const [idAlerta, setIdAlerta] = useState('');
    const [cursor, setCursor] = useState('auto');

    const setSnackbar = useSetAtom(snackbarAtom)
    

    const inventarioItemDefinirAlerta = async (id) => {
        setCursor('progress')

        try{
            const registro = await getRegistro('inventario', id)
            setRegistro(registro)
        } catch(e) {
            setSnackbar({
                open: true,
                severity: 'error',
                message: `Nao foi possivel definir o alerta: ${e.status} (${e.message})`
            })
            return setCursor('auto')
        }

        setIdAlerta(id)
        setOpenDefinir(true)
        setCursor('auto')
    }

    return (
        <Box sx={{ cursor: cursor }}>
            <Inventario
                cursor={cursor}
                inventarioItemDefinirAlerta={inventarioItemDefinirAlerta}
            />
            <DialogDefinirAlerta
                openDefinir={openDefinir}
                setOpenDefinir={setOpenDefinir}
                idAlerta={idAlerta}
                setIdAlerta={setIdAlerta}
                registro={registro}
            />
        </Box>
    );
}

export default PaginaInventario;