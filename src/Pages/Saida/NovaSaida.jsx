import React, { useState } from 'react';
import NovaSaidaMats from '../../components/Saida/NovaSaida';
import DialogCancelar from '../../components/DialogCancelar';
import DialogEnviar from '../../components/DialogEnviar';
import { useNavigate } from 'react-router';

const NovaSaida = () => {
    const [materiais, setMateriais] = useState([{ 
        id: '',
        tipo: '', 
        matDesabilitado: true,
        mats:[],
        currMat: '',
        qtdDesabilitado: true,
        quantidade: '',
        medida: '',
    }]);
    const [carregando, setCarregando] = useState(false);
    const [openCancelar, setOpenCancelar] = useState(false);
    const [openConfirmar, setOpenConfirmar] = useState(false);
    //const [baseSelecionada, setBaseSelecionada] = useState('');

    const navigate = useNavigate();

    return (
        <>
            <NovaSaidaMats 
                materiais={materiais}
                setMateriais={setMateriais}
                setOpenCancelar={setOpenCancelar}
                setOpenConfirmar={setOpenConfirmar}
                carregando={carregando}
                setCarregando={setCarregando}
                navigate={navigate}
                //baseSelecionada={baseSelecionada}
                //setBaseSelecionada={setBaseSelecionada}
            />
            <DialogCancelar
                paginaAnterior="saída de materiais"
                rota="/saida"
                openCancelar={openCancelar}
                setOpenCancelar={setOpenCancelar}
            />
            <DialogEnviar 
                openConfirmar={openConfirmar}
                setOpenConfirmar={setOpenConfirmar}
                texto="saída de materiais"
                form="nova-saida"
            />
        </>
    );
}

export default NovaSaida;