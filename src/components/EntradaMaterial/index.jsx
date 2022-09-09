import React from 'react';
import ContainerPrincipal from '../ContainerPrincipal';
import Titulo from '../Titulo';
import FiltrosEntrada from '../FiltrosEntrada';
import TabelaEntrada from '../TabelaEntrada';
import BotaoNovo from '../BotaoNovo';
import Paginacao from '../Paginacao';

const EntradaMaterial = (props) => {
    const {
        entradas,
        metaEntradas,
        page,
        setPage,
        carregando,
        setFiltros
    } = props;

    return (
        <ContainerPrincipal>
            <Titulo 
                voltaPara="/principal" 
                carregando={carregando}
            >
                Entrada de material
            </Titulo>

            <FiltrosEntrada
                setFiltros={setFiltros}
                setPage={setPage}
            />
            
            <TabelaEntrada 
                entradas={entradas} 
                metaEntradas={metaEntradas} 
                carregando={carregando}
            />

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