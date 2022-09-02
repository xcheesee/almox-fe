import React, { useState } from 'react';
import { enviaNovoForm } from '../../common/utils';
import NovaOrdemServico from '../../components/NovaOrdemServico';
import DialogCancelar from '../../components/DialogCancelar';
import DialogEnviar from '../../components/DialogEnviar';
import { useNavigate } from 'react-router';

const NovaOrdem = () => {
    const [materiais, setMateriais] = useState([{ material: '', quantidade: '' }]);
    const [carregando, setCarregando] = useState(false);
    const [openCancelar, setOpenCancelar] = useState(false);
    const [openConfirmar, setOpenConfirmar] = useState(false);

    const navigate = useNavigate();
    
    const cadastraOrdem = (e) => {
        enviaNovoForm(
            e, 
            'ordem_servico', 
            'ordemservico', 
            setCarregando, 
            setOpenConfirmar, 
            navigate
        );
    }

    return (
        <>
            <NovaOrdemServico 
                materiais={materiais}
                setMateriais={setMateriais}
                setOpenCancelar={setOpenCancelar}
                setOpenConfirmar={setOpenConfirmar}
                carregando={carregando}
                cadastraOrdem={cadastraOrdem}
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