import React, { useState } from 'react';
import NovaSaidaMats from '../../components/Saida/NovaSaida';
import DialogCancelar from '../../components/DialogCancelar';
import DialogEnviar from '../../components/DialogEnviar';
import { useNavigate } from 'react-router';

const NovaSaida = () => {

    const [carregando, setCarregando] = useState(false);
    const [openCancelar, setOpenCancelar] = useState(false);
    const [openConfirmar, setOpenConfirmar] = useState(false);
    //const [baseSelecionada, setBaseSelecionada] = useState('');

    const navigate = useNavigate();

    return (
        <>
            <NovaSaidaMats 
                setOpenCancelar={setOpenCancelar}
                openConfirmar={openConfirmar}
                setOpenConfirmar={setOpenConfirmar}
                carregando={carregando}
                setCarregando={setCarregando}
                formId="nova_saida"
            />

            <DialogCancelar
                paginaAnterior="saída de materiais"
                rota="/saida"
                openCancelar={openCancelar}
                setOpenCancelar={setOpenCancelar}
            />
        </>
    );
}

export default NovaSaida;