import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Inventario from '../components/Inventario';
import DialogDefinirAlerta from '../components/DialogDefinirAlerta';
import { getTabela } from '../common/utils';
import { filtrosAtom, mudancaAtom, pageAtom, sortAtom } from '../atomStore';
import { useAtomValue } from 'jotai';
import { useQuery, useQueryClient} from '@tanstack/react-query'

const PaginaInventario = () => {


    // const [itens, setItens] = useState([]);
    const [metaItens, setMetaItens] = useState({});
    const [registro, setRegistro] = useState({});
    const [carregando, setCarregando] = useState(true);
    const [openDefinir, setOpenDefinir] = useState(false);
    const [idAlerta, setIdAlerta] = useState('');
    const [cursor, setCursor] = useState('auto');
    
    const page = useAtomValue(pageAtom);
    const sort = useAtomValue(sortAtom);
    const filtros = useAtomValue(filtrosAtom);
    const houveMudanca = useAtomValue(mudancaAtom);
    
    const queryClient = useQueryClient()
    const itens = useQuery(['inventarioItens', page, filtros, sort], () => getTabela('inventarios', page, filtros, sort))

    // useEffect(() => {
    //     getTabela('inventarios', page, setCarregando, setItens, setMetaItens, filtros, sort);
    // }, [page, filtros, sort, houveMudanca])

    return (
        <Box sx={{ cursor: cursor }}>
            <Inventario
                itens={itens.data.data}
                metaItens={itens.data.meta}
                carregando={itens.isLoading}
                // setCarregando={setCarregando}
                setIdAlerta={setIdAlerta}
                setOpenDefinir={setOpenDefinir}
                setRegistro={setRegistro}
                cursor={cursor}
                setCursor={setCursor}
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