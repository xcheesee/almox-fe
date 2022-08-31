import React, { useState } from 'react';
import { enviaForm, headers } from '../../common/utils';
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
        const url = `${process.env.REACT_APP_API_URL}/ordem_servico`;
        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(enviaForm(e))
        };

        setCarregando(true);
        setOpenConfirmar(false);

        fetch(url, options)
            .then(res => { 
                if (res.ok) {
                    setCarregando(false);
                    navigate('/ordemservico', { replace: true });
                } else {
                    setCarregando(false);
                }
            })
            .then(data => console.log(data))
            .catch(err => console.log(err));
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
            />
        </>
    );
}

export default NovaOrdem;