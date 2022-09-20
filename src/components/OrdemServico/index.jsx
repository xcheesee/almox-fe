import React from 'react';
import ContainerPrincipal from '../ContainerPrincipal';
import Titulo from '../Titulo';
import FiltrosOrdem from '../FiltrosOrdem';
import TabelaOrdem from '../TabelaOrdem';
import BotaoNovo from '../BotaoNovo';
import Paginacao from '../Paginacao';

const OrdemServico = (props) => {
    const {
        ordens,
        metaOrdens,
        page,
        setPage,
        carregando,
        setOpenEditar,
        setOrdemServico,
        setCursor,
        cursor,
        setFiltros,
        setOpenDetalhes
    } = props;

    return (
        <ContainerPrincipal carregando={carregando}>
            <Titulo carregando={carregando}>Ordem de serviço</Titulo>

            <FiltrosOrdem
                setFiltros={setFiltros}
                setPage={setPage}
            />

            <TabelaOrdem 
                ordens={ordens} 
                carregando={carregando} 
                setOpenEditar={setOpenEditar}
                setOrdemServico={setOrdemServico}
                setCursor={setCursor}
                cursor={cursor}
                setOpenDetalhes={setOpenDetalhes}
            />

            <BotaoNovo caminho="/ordemservico/nova-ordem">
                Nova ordem
            </BotaoNovo>

            <Paginacao 
                page={page}
                setPage={setPage}
                count={metaOrdens.last_page}
            />
        </ContainerPrincipal>
    );
}

export default OrdemServico;