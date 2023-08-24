import React, { useState } from 'react';
import NovaSaidaContainer from '../../components/Saida/NovaSaida';
import DialogCancelar from '../../components/DialogCancelar';
import DialogEnviar from '../../components/DialogEnviar';
import { useNavigate } from 'react-router';
import { FormNovaSaida } from '../../components/Saida/FormSaida';

const NovaSaida = () => {

    const [carregando, setCarregando] = useState(false);
    const [openCancelar, setOpenCancelar] = useState(false);
    const [openConfirmar, setOpenConfirmar] = useState(false);
    const [errors, setErrors] = useState({});
    //const [baseSelecionada, setBaseSelecionada] = useState('');

    //const navigate = useNavigate();
    const formId="nova_saida"

    return (
        <>
            <NovaSaidaContainer 
                setOpenCancelar={setOpenCancelar}
                openConfirmar={openConfirmar}
                setOpenConfirmar={setOpenConfirmar}
                carregando={carregando}
                setCarregando={setCarregando}
                formId={formId}
            >
                <FormNovaSaida 
                    formId={formId}
                    setOpenConfirmar={setOpenConfirmar}
                    setCarregando={setCarregando} 
                    errors={errors}
                    setErrors={setErrors}
                />
            </NovaSaidaContainer>

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