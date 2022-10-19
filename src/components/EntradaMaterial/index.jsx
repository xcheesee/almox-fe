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
        carregando,
        setCarregando,
        setOpenEditar,
        setEntradaMaterial,
        setCursor,
        setHouveMudanca,
        cursor,
        setOpenDetalhes,
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
                setHouveMudanca={setHouveMudanca}
            />
            
            <TabelaEntrada 
                entradas={entradas} 
                metaEntradas={metaEntradas} 
                carregando={carregando}
                setCarregando={setCarregando}
                setOpenEditar={setOpenEditar}
                setEntradaMaterial={setEntradaMaterial}
                setCursor={setCursor}
                cursor={cursor}
                setOpenDetalhes={setOpenDetalhes}
            />

            <BotaoNovo caminho="/entrada/nova-entrada">
                Nova entrada
            </BotaoNovo>

            <Paginacao
                count={metaEntradas.last_page}
            />
        </ContainerPrincipal>
    );
}

export default EntradaMaterial;