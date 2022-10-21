import React from 'react';
import ContainerPrincipal from '../ContainerPrincipal';
import Titulo from '../Titulo';
import FiltrosOrdem from '../FiltrosOrdem';
import TabelaOrdem from '../TabelaOrdem';
import BotaoNovo from '../BotaoNovo';
import Paginacao from '../Paginacao';
import { authCreateOrdem } from '../../common/utils';

const OrdemServico = (props) => {
    const {
        ordens,
        metaOrdens,
        carregando,
        cursor,
        getSelectedOrdemInfo,
    } = props;

    return (
        <ContainerPrincipal carregando={carregando}>
            <Titulo carregando={carregando}>Ordem de serviço</Titulo>

            <FiltrosOrdem />

            <TabelaOrdem 
                ordens={ordens} 
                carregando={carregando} 
                getSelectedOrdemInfo={getSelectedOrdemInfo}
                cursor={cursor}
            />

            <BotaoNovo 
                caminho="/ordemservico/nova-ordem"
                display={authCreateOrdem(localStorage.getItem('perfil'))}    
            >
                Nova ordem
            </BotaoNovo>

            <Paginacao 
                count={metaOrdens?.last_page}
            />
        </ContainerPrincipal>
    );
}

export default OrdemServico;