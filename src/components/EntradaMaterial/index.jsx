import React from 'react';
import ContainerPrincipal from '../ContainerPrincipal';
import Titulo from '../Titulo';
import FiltrosEntrada from '../FiltrosEntrada';
import TabelaEntrada from '../TabelaEntrada';
import BotaoNovo from '../BotaoNovo';
import Paginacao from '../Paginacao';
import { authCreateEntrada } from '../../common/utils';

const EntradaMaterial = (props) => {
    const {
        entradas,
        metaEntradas,
        carregando,
        getSelectedEntradaInfo,
        cursor,
    } = props;

    return (
        <ContainerPrincipal>
            <Titulo 
                voltaPara="/principal" 
                carregando={carregando}
            >
                Entrada de material
            </Titulo>

            <FiltrosEntrada />
            
            <TabelaEntrada 
                entradas={entradas} 
                carregando={carregando}
                getSelectedEntradaInfo={getSelectedEntradaInfo}
                cursor={cursor}
            />

            <BotaoNovo 
                caminho="/entrada/nova-entrada" 
                display={authCreateEntrada(localStorage.getItem('perfil'))}
            >
                Nova entrada
            </BotaoNovo>

            <Paginacao
                count={metaEntradas?.last_page}
            />
        </ContainerPrincipal>
    );
}

export default EntradaMaterial;