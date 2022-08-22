import React, { useState } from 'react';
import Inventario from '../components/Inventario';
import DialogDefinirAlerta from '../components/DialogDefinirAlerta';

const PaginaInventario = () => {
    const [openDefinir, setOpenDefinir] = useState(false);
    const [idAlerta, setIdAlerta] = useState('');

    return (
        <>
            <Inventario
                setIdAlerta={setIdAlerta}
                setOpenDefinir={setOpenDefinir}
            />
            <DialogDefinirAlerta
                openDefinir={openDefinir}
                setOpenDefinir={setOpenDefinir}
                idAlerta={idAlerta}
                setIdAlerta={setIdAlerta}
            />
        </>
    );
}

export default PaginaInventario;