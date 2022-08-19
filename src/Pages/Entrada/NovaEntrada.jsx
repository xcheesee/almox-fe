import React, { useState } from 'react';
import NovaEntradaMaterial from '../../components/NovaEntradaMaterial';
import DialogCancelar from '../../components/DialogCancelar';

const NovaEntrada = () => {
    const [materiais, setMateriais] = useState([{ material: '', quantidade: '' }]);
    const [openCancelar, setOpenCancelar] = useState(false);

    return (
        <>
            <NovaEntradaMaterial 
                materiais={materiais}
                setMateriais={setMateriais}
                setOpenCancelar={setOpenCancelar}
            />
            <DialogCancelar 
                paginaAnterior="entrada de material" 
                rota="/entrada"
                openCancelar={openCancelar}
                setOpenCancelar={setOpenCancelar}
            />
        </>
    );
}

export default NovaEntrada;