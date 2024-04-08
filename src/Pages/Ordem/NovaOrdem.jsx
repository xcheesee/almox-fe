import React, { useState } from 'react';
import NovaOrdemServico from '../../components/OrdemServico/NovaOrdemServico';
import DialogCancelar from '../../components/DialogCancelar';
import DialogEnviar from '../../components/DialogEnviar';

const NovaOrdem = () => {
    const [carregando, setCarregando] = useState(false);
    const [openCancelar, setOpenCancelar] = useState(false);
    const [openConfirmar, setOpenConfirmar] = useState(false);

    return (
        <>
            <NovaOrdemServico 
                setOpenCancelar={setOpenCancelar}
                setOpenConfirmar={setOpenConfirmar}
                carregando={carregando}
                setCarregando={setCarregando}
            />
            <DialogCancelar
                paginaAnterior="ordem de serviço"
                rota="/ordemservico"
                openCancelar={openCancelar}
                setOpenCancelar={setOpenCancelar}
            />
            <DialogEnviar 
                openConfirmar={openConfirmar}
                setOpenConfirmar={setOpenConfirmar}
                texto="ordem de serviço"
                form="nova-ordem"
            />
        </>
    );
}

export default NovaOrdem;