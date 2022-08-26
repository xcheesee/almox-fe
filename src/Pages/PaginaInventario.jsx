import React, { useEffect, useState } from 'react';
import Inventario from '../components/Inventario';
import DialogDefinirAlerta from '../components/DialogDefinirAlerta';
import { getTabela } from '../common/utils';

const PaginaInventario = () => {
    const [itens, setItens] = useState([]);
    const [metaItens, setMetaItens] = useState({});
    const [page, setPage] = useState(1);
    const [carregando, setCarregando] = useState(true);
    const [openDefinir, setOpenDefinir] = useState(false);
    const [idAlerta, setIdAlerta] = useState('');

    useEffect(() => {
        getTabela('inventario', page, setCarregando, setItens, setMetaItens);
    }, [page])

    return (
        <>
            <Inventario
                itens={itens}
                metaItens={metaItens}
                page={page}
                setPage={setPage}
                carregando={carregando}
                setIdAlerta={setIdAlerta}
                setOpenDefinir={setOpenDefinir}
            />
            <DialogDefinirAlerta
                openDefinir={openDefinir}
                setOpenDefinir={setOpenDefinir}
                idAlerta={idAlerta}
                setIdAlerta={setIdAlerta}
            />
        </>
    );
}

export default PaginaInventario;