import React, { useState } from 'react';
import NovaOrdemServico from '../../components/NovaOrdemServico';
import DialogCancelar from '../../components/DialogCancelar';

const NovaOrdem = () => {
    const [materiais, setMateriais] = useState([{ material: '', quantidade: '' }]);
    const [openCancelar, setOpenCancelar] = useState(false)
    
    return (
        <>
            <NovaOrdemServico 
                materiais={materiais}
                setMateriais={setMateriais}
                setOpenCancelar={setOpenCancelar}
            />
            <DialogCancelar
                paginaAnterior="ordem de serviço"
                rota="/ordemservico"
                openCancelar={openCancelar}
                setOpenCancelar={setOpenCancelar}
            />
        </>
    );
}

export default NovaOrdem;