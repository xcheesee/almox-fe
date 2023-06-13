import React, { useState } from 'react';
import { Box } from '@mui/material';
import Inventario from '../components/Inventario';
import DialogDefinirAlerta from '../components/DialogDefinirAlerta';
import { getRegistro } from '../common/utils';

const PaginaInventario = () => {

    const [registro, setRegistro] = useState({});
    const [openDefinir, setOpenDefinir] = useState(false);
    const [idAlerta, setIdAlerta] = useState('');
    const [cursor, setCursor] = useState('auto');
    

    const inventarioItemDefinirAlerta = async (id) => {
        setCursor('progress')

        setRegistro(await getRegistro('inventario', id, ))
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