import React, { useState } from 'react';
import NovaOrdemServico from '../../components/NovaOrdemServico';
import DialogCancelar from '../../components/DialogCancelar';
import DialogEnviar from '../../components/DialogEnviar';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { getLocais } from '../../common/utils';

const NovaOrdem = ({ setSnackbar }) => {
    const [materiais, setMateriais] = useState([{ material: '', quantidade: '' }]);
    const [locais, setLocais] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [carregandoLocais, setCarregandoLocais] = useState(true);
    const [openCancelar, setOpenCancelar] = useState(false);
    const [openConfirmar, setOpenConfirmar] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        getLocais(setCarregandoLocais, setLocais);
    }, [])

    return (
        <>
            <NovaOrdemServico 
                materiais={materiais}
                setMateriais={setMateriais}
                setOpenCancelar={setOpenCancelar}
                setOpenConfirmar={setOpenConfirmar}
                carregando={carregando}
                setCarregando={setCarregando}
                navigate={navigate}
                setSnackbar={setSnackbar}
                locais={locais}
                carregandoLocais={carregandoLocais}
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