import React, { useEffect, useState } from 'react';
import NovaSaidaContainer from '../../components/Saida/NovaSaida';
import DialogCancelar from '../../components/DialogCancelar';
import { FormNovaSaida } from '../../components/Saida/FormSaida';
//import { useSetAtom } from 'jotai';
//import { profissionaisAtom } from '../../atomStore';

const NovaSaida = () => {

    const [carregando, setCarregando] = useState(false);
    const [openCancelar, setOpenCancelar] = useState(false);
    const [openConfirmar, setOpenConfirmar] = useState(false);
    //const setProfissionais = useSetAtom(profissionaisAtom);
    //const [baseSelecionada, setBaseSelecionada] = useState('');

    //useEffect(() => {
    //    setProfissionais([]);
    //}, [])

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
                    //errors={errors}
                    //setErrors={setErrors}
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