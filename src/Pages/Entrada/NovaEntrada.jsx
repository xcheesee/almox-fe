import React, { useState } from 'react';
import NovaEntradaMaterial from '../../components/EntradaMaterial/NovaEntradaMaterial';
import DialogCancelar from '../../components/DialogCancelar';
import DialogEnviar from '../../components/DialogEnviar';

const NovaEntrada = () => {
    const [carregando, setCarregando] = useState(false);
    const [openCancelar, setOpenCancelar] = useState(false);
    const [openConfirmar, setOpenConfirmar] = useState(false);

    return (
        <>
            <NovaEntradaMaterial 
                setOpenCancelar={setOpenCancelar}
                setOpenConfirmar={setOpenConfirmar}
                carregando={carregando}
                setCarregando={setCarregando}
            />
            <DialogCancelar 
                paginaAnterior="entrada de material" 
                rota="/entrada"
                openCancelar={openCancelar}
                setOpenCancelar={setOpenCancelar}
            />
            <DialogEnviar 
                openConfirmar={openConfirmar}
                setOpenConfirmar={setOpenConfirmar}
                texto="entrada de material"
                form="nova-entrada"
            />
        </>
    );
}

export default NovaEntrada;