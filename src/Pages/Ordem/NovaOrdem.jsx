import React, { useState } from 'react';
import NovaOrdemServico from '../../components/NovaOrdemServico';
import DialogCancelar from '../../components/DialogCancelar';
import DialogEnviar from '../../components/DialogEnviar';
import { useNavigate } from 'react-router';

const NovaOrdem = ({ setSnackbar, locais, carregandoLocais }) => {
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
    const [baseSelecionada, setBaseSelecionada] = useState('');
    const [deptoSelecionado, setDeptoSelecionado] = useState('');

    const navigate = useNavigate();

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
                baseSelecionada={baseSelecionada}
                setBaseSelecionada={setBaseSelecionada}
                deptoSelecionado={deptoSelecionado}
                setDeptoSelecionado={setDeptoSelecionado}
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