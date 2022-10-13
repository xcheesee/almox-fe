import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Inventario from '../components/Inventario';
import DialogDefinirAlerta from '../components/DialogDefinirAlerta';
import { getTabela } from '../common/utils';

const PaginaInventario = ({ setSnackbar }) => {
    const [itens, setItens] = useState([]);
    const [registro, setRegistro] = useState({});
    const [metaItens, setMetaItens] = useState({});
    const [page, setPage] = useState(1);
    const [carregando, setCarregando] = useState(true);
    const [openDefinir, setOpenDefinir] = useState(false);
    const [idAlerta, setIdAlerta] = useState('');
    const [filtros, setFiltros] = useState('');
    const [cursor, setCursor] = useState('auto');
    const [sort, setSort] = useState('');
    const [houveMudanca, setHouveMudanca] = useState(true);

    useEffect(() => {
        getTabela('inventarios', page, setCarregando, setItens, setMetaItens, filtros, sort);
    }, [page, filtros, sort, houveMudanca])

    return (
        <Box sx={{ cursor: cursor }}>
            <Inventario
                itens={itens}
                metaItens={metaItens}
                page={page}
                setPage={setPage}
                carregando={carregando}
                setCarregando={setCarregando}
                setIdAlerta={setIdAlerta}
                setOpenDefinir={setOpenDefinir}
                filtros={filtros}
                setFiltros={setFiltros}
                setRegistro={setRegistro}
                setHouveMudanca={setHouveMudanca}
                cursor={cursor}
                setCursor={setCursor}
                sort={sort}
                setSort={setSort}
            />
            <DialogDefinirAlerta
                openDefinir={openDefinir}
                setOpenDefinir={setOpenDefinir}
                idAlerta={idAlerta}
                setIdAlerta={setIdAlerta}
                registro={registro}
                setSnackbar={setSnackbar}
            />
        </Box>
    );
}

export default PaginaInventario;