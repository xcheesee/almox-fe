import React, { useState } from 'react';
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

    return (
        <>
            <NovaEntradaMaterial 
                materiais={materiais}
                setMateriais={setMateriais}
                setOpenCancelar={setOpenCancelar}
                setOpenConfirmar={setOpenConfirmar}
                carregando={carregando}
                setCarregando={setCarregando}
                navigate={navigate}
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