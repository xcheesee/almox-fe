import React from 'react';
import ContainerPrincipal from '../ContainerPrincipal';
import Titulo from '../Titulo';
import FiltrosOrdem from '../FiltrosOrdem';
import LoadingTabela from '../LoadingTabela';
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
        <ContainerPrincipal>
            <Titulo>Ordem de serviço</Titulo>

            <FiltrosOrdem />

            <LoadingTabela carregando={carregando}>
                <TabelaOrdem ordens={ordens} />
            </LoadingTabela>

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