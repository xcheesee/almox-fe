import React, { useState } from 'react';
import { TextField } from '@mui/material';
import Filtros from '../../Filtros';
import CampoDataRange from '../../CampoDataRange';

const FiltrosOrdem = () => {
    const [datas, setDatas] = useState([''])
    return (
        <Filtros
            //valor da data de servico e funcao para limpar tal data
            ordem={datas}
            limpaData={setDatas}
        >
            <CampoDataRange
                label={'Data de Emissão - faixa de pesquisa'}
                intervalo={datas}
                onChange={setDatas}
                className={"col-span-2"}
                separador={' - '}
                placeholder={'dd/mm/aaaa - dd/mm/aaaa'}
                size={'lg'}
            />

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

            {/*<TextField 
                label="Nome almoxarife responsável"
                name="almoxarife_nome"
                InputLabelProps={{ shrink: true }}
            />

            <TextField 
                label="E-mail almoxarife responsável"
                name="almoxarife_email"
                InputLabelProps={{ shrink: true }}
            />*/}
        </Filtros>
    );
}

export default FiltrosOrdem;