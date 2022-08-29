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
        carregando
    } = props;

    return (
        <ContainerPrincipal carregando={carregando}>
            <Titulo carregando={carregando}>Ordem de serviço</Titulo>

            <FiltrosOrdem />

            <TabelaOrdem ordens={ordens} carregando={carregando} />

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