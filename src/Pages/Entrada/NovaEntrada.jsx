import React, { useState } from 'react';
import { enviaNovoForm } from '../../common/utils';
import NovaEntradaMaterial from '../../components/NovaEntradaMaterial';
import DialogCancelar from '../../components/DialogCancelar';
import DialogEnviar from '../../components/DialogEnviar';
import { useNavigate } from 'react-router';

const NovaEntrada = () => {
    const [materiais, setMateriais] = useState([{ id: '', quantidade: '' }]);
    const [carregando, setCarregando] = useState(false);
    const [openCancelar, setOpenCancelar] = useState(false);
    const [openConfirmar, setOpenConfirmar] = useState(false);

    const navigate = useNavigate();

    const cadastraEntrada = (e) => {
        enviaNovoForm(
            e,
            'entrada', 
            'entrada', 
            setCarregando, 
            setOpenConfirmar, 
            navigate,
            materiais,
        );
    }

    return (
        <>
            <NovaEntradaMaterial 
                materiais={materiais}
                setMateriais={setMateriais}
                setOpenCancelar={setOpenCancelar}
                setOpenConfirmar={setOpenConfirmar}
                carregando={carregando}
                cadastraEntrada={cadastraEntrada}
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