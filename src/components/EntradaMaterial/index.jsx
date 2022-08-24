import React from 'react';
import ContainerPrincipal from '../ContainerPrincipal';
import Titulo from '../Titulo';
import FiltrosEntrada from '../FiltrosEntrada';
import LoadingTabela from '../LoadingTabela';
import TabelaEntrada from '../TabelaEntrada';
import BotaoNovo from '../BotaoNovo';
import Paginacao from '../Paginacao';

const EntradaMaterial = (props) => {
    const {
        entradas,
        metaEntradas,
        page,
        setPage,
        carregando
    } = props;

    return (
        <ContainerPrincipal>
            <Titulo voltaPara="/principal">
                Entrada de material
            </Titulo>

            <FiltrosEntrada />

            <LoadingTabela carregando={carregando}>
                <TabelaEntrada entradas={entradas} metaEntradas={metaEntradas} />
            </LoadingTabela>

            <BotaoNovo caminho="/entrada/nova-entrada">
                Nova entrada
            </BotaoNovo>

            <Paginacao 
                page={page}
                setPage={setPage}
                count={metaEntradas.last_page}
            />
        </ContainerPrincipal>
    );
}

export default EntradaMaterial;