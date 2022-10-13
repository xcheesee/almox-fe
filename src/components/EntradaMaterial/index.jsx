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
        setCarregando,
        setOpenEditar,
        setEntradaMaterial,
        setMateriais,
        setCursor,
        setHouveMudanca,
        cursor,
        filtros,
        setFiltros,
        setOpenDetalhes,
        sort,
        setSort
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
                filtros={filtros}
                setFiltros={setFiltros}
                setPage={setPage}
                setHouveMudanca={setHouveMudanca}
            />
            
            <TabelaEntrada 
                entradas={entradas} 
                metaEntradas={metaEntradas} 
                carregando={carregando}
                setCarregando={setCarregando}
                setOpenEditar={setOpenEditar}
                setEntradaMaterial={setEntradaMaterial}
                setMateriais={setMateriais}
                setCursor={setCursor}
                cursor={cursor}
                setOpenDetalhes={setOpenDetalhes}
                sort={sort}
                setSort={setSort}
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