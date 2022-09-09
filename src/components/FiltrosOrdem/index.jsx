import React, { useState } from 'react';
import { TextField } from '@mui/material';
import Filtros from '../Filtros';
import CampoDataRange from '../CampoDataRange';

const FiltrosOrdem = ({setFiltros, setPage}) => {
    const [datas, setDatas] = useState([''])
    return (
        <Filtros
            //valor da data de servico e funcao para limpar tal data
            ordem={datas}
            limpaData={setDatas}
            setFiltros={setFiltros}
            setPage={setPage}
        >
            <TextField 
                label="Base origem do pedido"
                name="origem"
                InputLabelProps={{ shrink: true }}
            />

            <TextField 
                label="Local de serviço"
                name="local_servico"
                InputLabelProps={{ shrink: true }}
            />

            <TextField 
                label="Nome almoxarife responsável"
                name="nome_almoxarife"
                InputLabelProps={{ shrink: true }}
            />

            <TextField 
                label="E-mail almoxarife responsável"
                name="email_almoxarife"
                InputLabelProps={{ shrink: true }}
            />

            {/* <TextField 
                label="Data serviço"
                name="data_servico"
                type="date"
                className="col-span-2"
                InputLabelProps={{ shrink: true }}
            /> */}

            <CampoDataRange
                className={'col-span-2'}
                label={'Data serviço - faixa de pesquisa'}
                intervalo={datas}
                onChange={setDatas}
                separador={' - '}
                placeholder={'dd/mm/aaaa - dd/mm/aaaa'}
                size={'lg'}
            />
        </Filtros>
    );
}

export default FiltrosOrdem;