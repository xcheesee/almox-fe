import React, { useEffect, useState } from 'react';
import NovaEntradaMaterial from '../../components/NovaEntradaMaterial';
import DialogCancelar from '../../components/DialogCancelar';
import DialogEnviar from '../../components/DialogEnviar';
import { useNavigate } from 'react-router';
import { token } from '../../common/utils';




const NovaEntrada = ({ setSnackbar }) => {


    //propriedades criadas para armazenar dados e comportamentos de cada select individual
    const [materiais, setMateriais] = useState([{ 
        id: '', 
        mats:[], 
        quantidade: '',
        matDesabilitado: true,
        qtdDesabilitado: true,
    }]);
    const [carregando, setCarregando] = useState(false);
    const [openCancelar, setOpenCancelar] = useState(false);
    const [openConfirmar, setOpenConfirmar] = useState(false);
    // const [tipos, setTipos] = useState({})

    const navigate = useNavigate();

    // useEffect(() => {
    //     const url = `${process.env.REACT_APP_API_URL}/tipo_items`
    //     const options = {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //             'Authorization': `Bearer ${token}`
    //         },
    //     };
        
    //     const getData = async () => {
    //         const res = await fetch(url, options)
    //         const data = await res.json()
    //         setTipos(data)
    //         return
    //     }
    //     getData()
        
    // }, [])


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
                setSnackbar={setSnackbar}
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