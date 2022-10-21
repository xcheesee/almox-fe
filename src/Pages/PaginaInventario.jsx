import React, { useState } from 'react';
import { Box } from '@mui/material';
import Inventario from '../components/Inventario';
import DialogDefinirAlerta from '../components/DialogDefinirAlerta';
import { getRegistro, getTabela } from '../common/utils';
import { filtrosAtom, pageAtom, sortAtom } from '../atomStore';
import { useAtomValue } from 'jotai';
import { useQuery, useQueryClient} from '@tanstack/react-query'

const PaginaInventario = () => {

    const [registro, setRegistro] = useState({});
    const [openDefinir, setOpenDefinir] = useState(false);
    const [idAlerta, setIdAlerta] = useState('');
    const [cursor, setCursor] = useState('auto');
    
    const page = useAtomValue(pageAtom);
    const sort = useAtomValue(sortAtom);
    const filtros = useAtomValue(filtrosAtom);
    
    const queryClient = useQueryClient()
    const itens = useQuery(['inventarioItens', page, filtros, sort], () => getTabela('inventarios', page, filtros, sort))

    const inventarioItemDefinirAlerta = (id) => {
        getRegistro('inventario', id, setOpenDefinir, setRegistro, setCursor);
        setIdAlerta(id)
    }

    return (
        <Box sx={{ cursor: cursor }}>
            <Inventario
                itens={itens?.data?.data}
                metaItens={itens?.data?.meta}
                carregando={itens?.isLoading}
                cursor={cursor}
                inventarioItemDefinirAlerta={inventarioItemDefinirAlerta}
            />
            <DialogDefinirAlerta
                openDefinir={openDefinir}
                setOpenDefinir={setOpenDefinir}
                idAlerta={idAlerta}
                setIdAlerta={setIdAlerta}
                registro={registro}
            />
        </Box>
    );
}

export default PaginaInventario;